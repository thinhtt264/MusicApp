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
import Constants from 'src/themes/Constants';
import { Header_Distance } from 'src/components/header/AlbumBanner';
import { Header_Height } from './BackHeader';

type Props = {
  translationY: SharedValue<number>;
  onPress: () => void;
};
const topz = Header_Height + scale(24);
const AnimatedButton = Animated.createAnimatedComponent(TouchableOpacity);
const FloatingButtonComponent = ({ translationY, onPress }: Props) => {
  const stylez = useAnimatedStyle(() => {
    const top = interpolate(
      translationY.value,
      [0, Constants.scale40],
      [topz, Header_Height - Constants.scale10],
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
