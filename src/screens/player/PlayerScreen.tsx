import { StyleSheet, View } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useScreenController } from 'src/common/hooks';
import { getRecommend } from 'src/store/action-thunk';
import { useAppSelector } from 'src/common/redux';
import { Header, TrackImage, TrackInfo } from './components';
import { Blurhash } from 'react-native-blurhash';
import { StatusBar } from 'react-native';
import { kWidth } from 'src/common/constants';
import { scale } from 'src/common/scale';
import { onSwitchTrack, startAudio } from 'src/common/player';
import { ControllerBar } from './components';
import TrackPlayer, {
  Event,
  State,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import Layout from 'src/themes/Layout';
import { formatSearchData, playerActions } from 'src/store/action-slices';
import { getBackGroundPlayer, getBlurhashColor } from 'src/common/helper';
import Colors from 'src/themes/Colors';
import Constants, {
  FULLSCREEN_HEIGHT,
  MINIPLAYER_HEIGHT,
} from 'src/themes/Constants';
import { TrackDataItemFields } from '../../models/Track';
import Animated, {
  Extrapolate,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

const events = [
  Event.PlaybackState,
  Event.PlaybackError,
  Event.PlaybackActiveTrackChanged,
];

const PlayerScreen = ({ route, translationY }: any) => {
  const { dispatch, navigation } = useScreenController();

  const { from = 'search' } = route?.params || 'search';
  const { currentTrack, trackQueue } = useAppSelector(state => state.player);

  // const [isLoading, setLoading] = useState(true);
  const [buffering, setBuffering] = useState(true);
  const [bgColor, setBgColor] = useState('');
  const [option, setOptions] = useState<'next' | 'previous'>('next');

  const { albumImage, trackName, trackId, trackUrl, artistName, artistId } =
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

  const initPlayer = async () => {
    console.log(currentTrack.url);

    if (currentTrack.url)
      await startAudio({ info: currentTrack, from: 'search' });
    await TrackPlayer.setPlayWhenReady(true);
  };

  useEffect(() => {
    StatusBar.setBackgroundColor('transparent');
    StatusBar.setTranslucent(true);

    initPlayer();
    dispatch(
      getRecommend({
        artists: artistId,
        tracks: trackId,
      }),
    );
  }, []);

  const onGoBack = () => navigation.goBack();

  const switchTrack = async (option: 'next' | 'previous') => {
    if (trackQueue.length > 1) {
      setOptions(option);
      await dispatch(
        playerActions.onChangeCurrentTrack({
          id: trackId,
          option: option,
        }),
      );
      setBuffering(true);
      await onSwitchTrack(option);
    }
  };

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
        switchTrack('next');
      }
    } else if (event.type === Event.PlaybackActiveTrackChanged) {
      console.log('đổi bài');
    }
  });

  const FragmentView =
    bgColor === Colors.grey.player ? (
      <View style={[styles.defaultBackground, { backgroundColor: bgColor }]} />
    ) : (
      <View style={styles.blurHashBackground}>
        <Blurhash blurhash={bgColor} style={Layout.fill} />
      </View>
    );

  return !bgColor ? (
    <></>
  ) : (
    <>
      {FragmentView}
      <View style={styles.container}>
        <Header from={from} translationY={translationY} />
        <TrackImage
          trackQueue={trackQueue}
          currentTrack={currentTrack}
          translationY={translationY}
          switchTrack={option => switchTrack(option)}
        />
        <TrackInfo
          artistName={artistName}
          trackName={trackName}
          translationY={translationY}
        />
        <ControllerBar
          translationY={translationY}
          buffering={buffering}
          switchTrack={option => switchTrack(option)}
        />
        {/* <ProgressBar style={styles.progessBar} /> */}
      </View>
    </>
  );
};

export default PlayerScreen;

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: scale(10),
  },
  progessBar: {
    height: scale(50),
  },
  blurHashBackground: {
    borderRadius: scale(5),
    height: '100%',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: -1,
    overflow: 'hidden',
  },
  defaultBackground: {
    // borderRadius: scale(10),
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
});
