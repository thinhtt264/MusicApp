import { StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { scale } from 'src/common/scale';
import Animated, {
  Extrapolate,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Constants, { FULLSCREEN_HEIGHT } from 'src/themes/Constants';
import { useInsets } from 'src/common/animated';

type Props = {
  translationY: SharedValue<number>;
  onPress: () => void;
};
const AnimatedButton = Animated.createAnimatedComponent(TouchableOpacity);

const ScollDownButton = ({ translationY, onPress }: Props) => {
  const insets = useInsets();

  const animatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      translationY.value,
      [0, -FULLSCREEN_HEIGHT],
      [-70, 0],
      Extrapolate.CLAMP,
    );
    const top = interpolate(
      translationY.value,
      [0, -FULLSCREEN_HEIGHT],
      [0, Constants.scale30 + insets.top - 3],
      Extrapolate.CLAMP,
    );

    return {
      top,
      transform: [{ translateY }],
    };
  });

  return (
    <AnimatedButton
      onPress={onPress}
      onLongPress={onPress}
      style={[animatedStyle, styles.container]}>
      <Ionicons
        name="chevron-down-outline"
        color={'white'}
        size={scale(20)}
        style={{ marginLeft: -scale(5) }}
      />
    </AnimatedButton>
  );
};

export default ScollDownButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    position: 'absolute',
    zIndex: 3,
    left: scale(25),
  },
});
