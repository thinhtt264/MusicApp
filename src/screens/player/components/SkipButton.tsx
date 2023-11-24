import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { scale } from '../../../common/scale/index';
import Colors from 'src/themes/Colors';
import Animated, {
  Extrapolate,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Constants, { FULLSCREEN_HEIGHT } from 'src/themes/Constants';

interface SkipButtonProps {
  direction: 'previous' | 'next';
  switchTrack: () => void;
  translationY: SharedValue<number>;
}

const AnimatedButton = Animated.createAnimatedComponent(TouchableOpacity);
const AnimatedVector = Animated.createAnimatedComponent(FontAwesome6);

const IconHeight = scale(22);
const IconWidth = scale(24);

const SkipButton: React.FC<SkipButtonProps> = React.memo(
  ({ direction, switchTrack, translationY }) => {
    const iconName =
      direction === 'previous' ? 'backward-step' : 'forward-step';

    const animatedStylez = useAnimatedStyle(() => {
      // const height = interpolate(
      //   translationY.value,
      //   [0, -FULLSCREEN_HEIGHT],
      //   [Constants.scale20, IconHeight],
      //   Extrapolate.CLAMP,
      // );
      // const width = interpolate(
      //   translationY.value,
      //   [0, -FULLSCREEN_HEIGHT],
      //   [Constants.scale20, IconWidth],
      //   Extrapolate.CLAMP,
      // );
      const scale = interpolate(
        translationY.value,
        [0, -FULLSCREEN_HEIGHT],
        [1, 1],
        Extrapolate.CLAMP,
      );

      return {
        transform: [{ scale }],
      };
    });

    const iconSize = useAnimatedStyle(() => {
      const scale = interpolate(
        translationY.value,
        [0, -FULLSCREEN_HEIGHT],
        [1, IconHeight / 50],
        Extrapolate.CLAMP,
      );

      return {
        fontSize: 50,
        transform: [{ scale }],
      };
    });

    return (
      <AnimatedButton onPress={switchTrack} style={[animatedStylez]}>
        <AnimatedVector
          name={iconName}
          style={iconSize}
          color={Colors.white.default}
        />
      </AnimatedButton>
    );
  },
);

export default SkipButton;

const styles = StyleSheet.create({});
