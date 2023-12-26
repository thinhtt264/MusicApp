import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { memo } from 'react';
import Animated, {
  FadeIn,
  FadeOut,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { scale } from 'src/common/scale';
import Colors from 'src/themes/Colors';
import isEqual from 'react-fast-compare';
import { Header_Min_Height } from 'src/components/header/Banner';
import Constants from 'src/themes/Constants';

type Props = {
  translationY: SharedValue<number>;
  onPress: () => void;
};
const Header_Distance = scale(250);
const topz = scale(310);
const AnimatedButton = Animated.createAnimatedComponent(TouchableOpacity);
const FloatingButtonComponent = ({ translationY, onPress }: Props) => {
  const stylez = useAnimatedStyle(() => {
    const top = interpolate(
      translationY.value,
      [0, Header_Distance],
      [topz, Header_Min_Height - Constants.scale20],
      'clamp',
    );
    return {
      top,
    };
  });

  return (
    <AnimatedButton
      onPress={onPress}
      style={[styles.floatingBtn, stylez]}
      activeOpacity={0.7}>
      <Animated.View
        style={[styles.playButton]}
        entering={FadeIn.duration(500)}
        exiting={FadeOut}>
        <FontAwesome6
          size={scale(16)}
          style={styles.icon}
          name={'play'}
          color={Colors.black.default}
        />
      </Animated.View>
    </AnimatedButton>
  );
};

export const FloatingButton = memo(FloatingButtonComponent, isEqual);

const styles = StyleSheet.create({
  floatingBtn: {
    position: 'absolute',
    right: scale(10),
    zIndex: 999,
  },
  playButton: {
    height: scale(40),
    width: scale(40),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.green.default,
    borderRadius: scale(20),
  },
  icon: { marginLeft: scale(2) },
});
