import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { WaveIndicator } from 'react-native-indicators';
import Animated, {
  Extrapolate,
  FadeIn,
  FadeOut,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import TrackPlayer from 'react-native-track-player';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { usePlayerSate } from 'src/common/hooks';
import { scale } from 'src/common/scale';
import Colors from 'src/themes/Colors';
import Constants, { FULLSCREEN_HEIGHT } from 'src/themes/Constants';

const AnimatedIcon = Animated.createAnimatedComponent(WaveIndicator);
const AnimatedVector = Animated.createAnimatedComponent(FontAwesome6);

export const PlayPauseButton = React.memo(
  ({
    buffering = false,
    translationY,
  }: {
    buffering: boolean;
    translationY: SharedValue<number>;
  }) => {
    const { isPlaying, isEnded, isPaused, isReady } = usePlayerSate();

    const play = async () => {
      if (isEnded) {
      } else if (isPaused || isReady) {
        await TrackPlayer.play();
      }
    };
    const animatedStyle = useAnimatedStyle(() => {
      const size = interpolate(
        translationY.value,
        [0, -FULLSCREEN_HEIGHT],
        [Constants.scale25, Constants.scale50],
        Extrapolate.CLAMP,
      );

      return {
        width: size,
        height: size,
      };
    });

    const iconStylez = useAnimatedStyle(() => {
      const fontSize = interpolate(
        translationY.value,
        [0, -FULLSCREEN_HEIGHT],
        [Constants.scale10, Constants.scale15],
        Extrapolate.CLAMP,
      );
      return {
        fontSize,
      };
    });

    return buffering ? (
      <View>
        <AnimatedIcon style={animatedStyle} color={Colors.white.default} />
      </View>
    ) : (
      <TouchableOpacity onPress={isPlaying ? TrackPlayer.pause : play}>
        <Animated.View
          style={[styles.container, animatedStyle]}
          entering={FadeIn.duration(500)}
          exiting={FadeOut}>
          <AnimatedVector
            style={[
              { marginLeft: isPlaying ? scale(0) : scale(2) },
              iconStylez,
            ]}
            name={isPlaying ? 'pause' : 'play'}
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
