import { Platform, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { useScreenController } from 'src/common/hooks';
import { getDownloadLink } from 'src/store/action-thunk';
import { useAppSelector } from 'src/common/redux';
import { Header } from './components';
import { Blurhash } from 'react-native-blurhash';
import { StatusBar } from 'react-native';
import { kWidth } from 'src/common/constants';
import FastImage from 'react-native-fast-image';
import { scale } from 'src/common/scale';
import { startAudio } from 'src/common/player';
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

const events = [Event.PlaybackState, Event.PlaybackError];

const PlayerScreen = ({ route }: any) => {
  const { dispatch, navigation } = useScreenController();

  const { item, bgColor } = route?.params;
  const { albumImage, trackUrl, trackName, trackId, artistName } =
    formatSearchData(item);

  const { env } = useAppSelector(state => state.app);
  const { currentTrack } = useAppSelector(state => state.player);

  const [isLoading, setLoading] = useState(true);
  const [buffering, setBuffering] = useState(false);

  const fetchAndStartAudio = async () => {
    if (checkCurrentTrack()) {
      await startMusic(currentTrack);
    } else {
      const trackResponse: any = await getTrackInfo({ doc: trackId });
      if (trackResponse._data) {
        await startMusic(trackResponse._data);
      } else {
        const response = await dispatch(
          getDownloadLink({ link: trackUrl, baseUrl: env?.DOWNLOAD_URL ?? '' }),
        ).unwrap();

        const trackInfoWithUrl = {
          ...item,
          url: response.soundcloudTrack.audio[0].url,
        };
        setTrackInfo({ data: trackInfoWithUrl, doc: trackId });
        await startMusic(trackInfoWithUrl);
      }
    }
  };

  const checkCurrentTrack = useCallback(() => {
    if (currentTrack.id === trackId) return true;
    return false;
  }, [currentTrack.url, trackId]);

  useEffect(() => {
    fetchAndStartAudio();
  }, []);

  const startMusic = useCallback(async (info: any) => {
    setLoading(false);
    setBuffering(true);
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
    bgColor === 'rgb(72,72,72)' ? (
      <View style={[Layout.absolute, { backgroundColor: bgColor }]} />
    ) : (
      <Blurhash
        blurhash={bgColor}
        style={{
          height: '100%',
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: -1,
        }}
      />
    );

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <>
      {FragmentView}
      <View style={styles.container}>
        <Header title={trackName} LeftIcon onLeftPress={onGoBack} />
        <FastImage
          source={{ uri: albumImage }}
          style={styles.image}
          resizeMode="stretch"
        />
        <ProgressBar style={styles.progessBar} />
        <ControllerBar buffering={buffering} />
      </View>
    </>
  );
};

export default PlayerScreen;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center' },
  image: {
    height: kWidth - scale(70),
    width: kWidth - scale(70),
    marginTop: scale(35),
    borderRadius: scale(4),
  },
  progessBar: {
    height: scale(50),
    width: kWidth - scale(70),
  },
});
