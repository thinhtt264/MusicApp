import { StyleSheet, View } from 'react-native';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { useAppSelector } from 'src/common/redux';
import { Header, ProgressBar, TrackImage, TrackInfo } from './components';
import { Blurhash } from 'react-native-blurhash';
import { StatusBar } from 'react-native';
import { scale } from 'src/common/scale';
import { onSwitchTrack, startAudio } from 'src/common/player';
import { ControllerBar } from './components';
import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  Event,
  State,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import Layout from 'src/themes/Layout';
import { formatSearchData } from 'src/store/action-slices';
import { getBackGroundPlayer, getBlurhashColor } from 'src/common/helper';
import Colors from 'src/themes/Colors';
import { isIos } from 'src/common/device';

const events = [
  Event.PlaybackState,
  Event.PlaybackError,
  Event.PlaybackActiveTrackChanged,
  Event.PlaybackQueueEnded,
];

const PlayerScreen = ({ translationY }: any) => {
  const { currentTrack, trackQueue } = useAppSelector(state => state.player);
  const [buffering, setBuffering] = useState(true);
  const [bgColor, setBgColor] = useState('');

  const { albumImage } = formatSearchData(currentTrack);

  useLayoutEffect(() => {
    getBgColor();
  }, [albumImage]);

  const getBgColor = useCallback(async () => {
    const backgroundColor = await getBackGroundPlayer(albumImage);
    const blurHashColor =
      backgroundColor !== Colors.grey.player
        ? await getBlurhashColor(albumImage)
        : false;
    setBgColor(blurHashColor || backgroundColor || Colors.grey.player);
  }, [albumImage]);

  const initPlayer = async () => {
    await startAudio({ info: currentTrack, from: 'home' });
    registerEventListeners();
  };

  useEffect(() => {
    if (!isIos) {
      StatusBar.setBackgroundColor('transparent');
      StatusBar.setTranslucent(true);
    }
    initPlayer();
  }, []);

  const switchTrack = useCallback(async (option: 'next' | 'previous') => {
    if (trackQueue.length > 0) {
      setBuffering(true);
      await onSwitchTrack(option);
      setBuffering(false);
    }
  }, []);

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
    } else if (event.type === Event.PlaybackActiveTrackChanged && event.track) {
      await TrackPlayer.updateOptions({
        // Media controls capabilities
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.Stop,
        ],

        // Capabilities that will show up when the notification is in the compact form on Android
        compactCapabilities: [Capability.Play, Capability.Pause],

        notificationCapabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.Stop,
        ],
        android: {
          appKilledPlaybackBehavior:
            AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
        },
        icon: require('../../../src/assets/images/Spotify_Logo.png'),
        nextIcon: require('../../../src/assets/images/Spotify_Logo.png'),
        color: 0xffff0000,
      });
    }
  });

  const registerEventListeners = () => {
    TrackPlayer.addEventListener(Event.RemoteNext, () => switchTrack('next'));
    TrackPlayer.addEventListener(Event.RemotePrevious, () =>
      switchTrack('previous'),
    );
  };

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
        <Header translationY={translationY} />
        <TrackImage
          trackQueue={trackQueue}
          currentTrack={currentTrack}
          translationY={translationY}
          switchTrack={option => switchTrack(option)}
        />
        <TrackInfo TrackInfo={currentTrack} translationY={translationY} />
        <ProgressBar translationY={translationY} />
        <ControllerBar
          translationY={translationY}
          buffering={buffering}
          switchTrack={option => switchTrack(option)}
        />
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
    // borderRadius: scale(5),
    height: '100%',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: -1,
    // overflow: 'hidden',
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
