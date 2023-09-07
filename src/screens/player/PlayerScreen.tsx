import { Platform, StyleSheet, View, ScrollView } from 'react-native';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { useScreenController } from 'src/common/hooks';
import { getDownloadLink } from 'src/store/action-thunk';
import { useAppSelector } from 'src/common/redux';
import { Header, TrackInfo } from './components';
import { Blurhash } from 'react-native-blurhash';
import { StatusBar } from 'react-native';
import { kWidth } from 'src/common/constants';
import FastImage from 'react-native-fast-image';
import { scale } from 'src/common/scale';
import { downloadTrack, startAudio } from 'src/common/player';
import { LoadingScreen } from '../loading/LoadingScreen';
import { useFocusEffect } from '@react-navigation/native';
import { ProgressBar, ControllerBar } from './components';
import TrackPlayer, {
  Event,
  State,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import Layout from 'src/themes/Layout';
import { getTrackInfo, setTrackInfo } from 'src/common/firebase';
import { formatSearchData } from 'src/store/action-slices';
import { getBackGroundPlayer, getBlurhashColor } from 'src/common/helper';
import Colors from 'src/themes/Colors';

const events = [Event.PlaybackState, Event.PlaybackError];

const PlayerScreen = ({ route }: any) => {
  const { dispatch, navigation } = useScreenController();

  const { from } = route?.params;
  const { env } = useAppSelector(state => state.app);
  const { currentTrack } = useAppSelector(state => state.player);

  // const [isLoading, setLoading] = useState(true);
  const [buffering, setBuffering] = useState(false);
  const [bgColor, setBgColor] = useState('');

  const { albumImage, trackUrl, trackName, trackId, artistName } =
    formatSearchData(currentTrack);

  useLayoutEffect(() => {
    getBgColor();
    return () => {};
  }, [albumImage]);

  const getBgColor = async () => {
    const bgColor = await getBackGroundPlayer(albumImage);
    const blurHashColor =
      bgColor !== Colors.grey.player
        ? await getBlurhashColor(albumImage)
        : false;
    setBgColor(blurHashColor || bgColor || Colors.grey.player);
  };

  const fetchAndStartAudio = async () => {
    setBuffering(true);
    const trackResponse: any = await getTrackInfo({ doc: trackId });
    if (trackResponse._data) {
      console.log('phát từ firebase');
      await startMusic(trackResponse._data);
    } else {
      const response = await dispatch(
        getDownloadLink({ link: trackUrl, baseUrl: env?.DOWNLOAD_URL ?? '' }),
      ).unwrap();

      const trackInfoWithUrl = {
        ...currentTrack,
        url: response.soundcloudTrack.audio[0].url,
      };
      // setTrackInfo({ data: trackInfoWithUrl, doc: trackId });
      downloadTrack(trackInfoWithUrl);
      await startMusic(trackInfoWithUrl);
    }
  };

  useEffect(() => {
    fetchAndStartAudio();
  }, []);

  const startMusic = useCallback(async (info: any) => {
    await startAudio({ info });
  }, []);

  const onGoBack = () => navigation.goBack();

  useFocusEffect(
    useCallback(() => {
      Platform.OS === 'android' && StatusBar.setBackgroundColor('transparent');
      StatusBar.setTranslucent(true);
    }, []),
  );

  useTrackPlayerEvents(events, async event => {
    if (event.type === Event.PlaybackError) {
      console.log('An error occurred while playing the current track.');
      TrackPlayer.retry();
    } else if (event.type === Event.PlaybackState) {
      if (event.state === State.Buffering || event.state === State.Loading) {
        setBuffering(true);
      } else if (event.state === State.Ready) {
        setBuffering(false);
      } else if (event.state === State.Ended) {
        const currentQueue = await TrackPlayer.getQueue();
        if (currentQueue.length > 1) {
          TrackPlayer.skipToNext();
        }
      }
    }
  });

  const FragmentView =
    bgColor === Colors.grey.player ? (
      <View style={[Layout.absolute, { backgroundColor: bgColor }]} />
    ) : (
      <Blurhash blurhash={bgColor} style={styles.blurHashBackground} />
    );

  return !bgColor ? (
    <></>
  ) : (
    <>
      {FragmentView}
      <ScrollView style={styles.container}>
        <Header LeftIcon onLeftPress={onGoBack} from={from} />
        <FastImage
          source={{ uri: albumImage }}
          style={styles.image}
          resizeMode="cover"
        />
        <TrackInfo artistName={artistName} trackName={trackName} />
        <ProgressBar style={styles.progessBar} />
        <ControllerBar buffering={buffering} />
      </ScrollView>
    </>
  );
};

export default PlayerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    paddingHorizontal: scale(25),
  },
  image: {
    height: kWidth - scale(70),
    width: kWidth,
    marginTop: scale(35),
    borderRadius: scale(4),
  },
  progessBar: {
    height: scale(50),
  },
  blurHashBackground: {
    height: '100%',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: -1,
  },
});
