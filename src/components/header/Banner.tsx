import { StyleSheet, View } from 'react-native';
import React, { memo } from 'react';
import isEqual from 'react-fast-compare';
import FastImage from 'react-native-fast-image';
import Animated, {
  Extrapolate,
  SharedValue,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { scale } from 'src/common/scale';
import Layout from 'src/themes/Layout';

type Props = {
  img: string;
  translationY: SharedValue<number>;
};

const BannerComponent = ({ img, translationY }: Props) => {
  const Header_Max_Height = 250;
  const Header_Min_Height = 80;
  const Scroll_Distance = Header_Max_Height - Header_Min_Height;

  const animatedStyle = useAnimatedStyle(() => {
    'worklet';
    const opacity = interpolate(
      translationY.value,
      [0, 100, 200],
      [1, 1, 0],
      Extrapolate.CLAMP,
    );

    const height = interpolate(
      translationY.value,
      [0, Scroll_Distance],
      [Header_Max_Height, Header_Min_Height],
      Extrapolate.CLAMP,
    );

    const backgroundColor = interpolateColor(
      translationY.value,
      [0, 100, 200],
      ['rgba(255, 0, 0, 0)', 'rgba(255, 0, 0, 0)', 'rgba(255, 0, 0, 1)'],
    );

    return {
      // opacity,
      backgroundColor,
      height,
    };
  });

  const headerStylez = useAnimatedStyle(() => {
    const opacity = interpolate(
      translationY.value,
      [0, 100, 200],
      [0, 0, 1],
      Extrapolate.CLAMP,
    );

    return {
      opacity,
    };
  });

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <FastImage
        source={{ uri: img }}
        resizeMode="cover"
        style={styles.background}
      />
      <Animated.View
        style={[
          headerStylez,
          Layout.fill,
          Layout.absolute,
          { backgroundColor: 'green' },
        ]}></Animated.View>
    </Animated.View>
  );
};

export const Banner = memo(BannerComponent, isEqual);

const styles = StyleSheet.create({
  container: {
    // height: scale(250),
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    width: '100%',
    height: '100%',
  },
});
