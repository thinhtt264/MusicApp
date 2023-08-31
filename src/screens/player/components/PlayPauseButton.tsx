import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { WaveIndicator } from 'react-native-indicators';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import TrackPlayer, {
  State,
  usePlaybackState,
} from 'react-native-track-player';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { startAudio } from 'src/common/player';
import { scale } from 'src/common/scale';
import Colors from 'src/themes/Colors';

export const PlayPauseButton = React.memo(
  ({ buffering = false }: { buffering: boolean }) => {
    const playerState = usePlaybackState();
    const isPlaying = playerState.state === State.Playing;

    const play = async () => {
      if (playerState.state === State.Ended) {
        await startAudio({ info: false });
      } else if (playerState.state === State.Paused) {
        await TrackPlayer.play();
      }
    };

    return buffering ? (
      <View style={{ width: scale(50) }}>
        <WaveIndicator size={scale(50)} color={Colors.white.default} />
      </View>
    ) : (
      <TouchableOpacity onPress={isPlaying ? TrackPlayer.pause : play}>
        <Animated.View
          style={styles.container}
          entering={FadeIn.duration(500)}
          exiting={FadeOut}>
          <FontAwesome6
            style={{ marginLeft: isPlaying ? scale(0) : scale(2) }}
            name={isPlaying ? 'pause' : 'play'}
            size={scale(18)}
            color={Colors.black.default}
          />
        </Animated.View>
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    height: scale(50),
    width: scale(50),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white.default,
    borderRadius: scale(25),
  },
});
