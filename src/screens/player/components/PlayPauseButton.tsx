import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { WaveIndicator } from 'react-native-indicators';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import TrackPlayer, { State } from 'react-native-track-player';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { usePlayerSate } from 'src/common/hooks';
import { startAudio } from 'src/common/player';
import { scale } from 'src/common/scale';
import Colors from 'src/themes/Colors';

export const PlayPauseButton = React.memo(
  ({ buffering = false }: { buffering: boolean }) => {
    const { isPlaying, isEnded, isPaused } = usePlayerSate();

    const play = async () => {
      if (isEnded) {
        await startAudio({ info: false });
      } else if (isPaused) {
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
