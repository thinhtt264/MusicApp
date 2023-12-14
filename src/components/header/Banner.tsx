import { StyleSheet, View } from 'react-native';
import React, { memo, useCallback, useLayoutEffect, useState } from 'react';
import isEqual from 'react-fast-compare';
import FastImage from 'react-native-fast-image';
import Animated, {
  Extrapolate,
  SharedValue,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { fontScale, scale } from 'src/common/scale';
import Layout from 'src/themes/Layout';
import { getBlurhashColor } from 'src/common/helper';
import Colors from 'src/themes/Colors';
import { Blurhash } from 'react-native-blurhash';
import Icon from 'react-native-vector-icons/Ionicons';
import { navigation } from 'src/common/navigation';
import Constants from 'src/themes/Constants';
import { SemiBoldText } from '../text';

type Props = {
  img: string;
  name: string;
  translationY: SharedValue<number>;
};
const Header_Max_Height = scale(380);
const Header_Min_Height = scale(80);
const Header_Distance = scale(265);

const BannerComponent = ({ img, name, translationY }: Props) => {
  const [bgColor, setBgColor] = useState('');

  const animatedStyle = useAnimatedStyle(() => {
    'worklet';
    const opacity = interpolate(
      translationY.value,
      [0, 200],
      [1, 0],
      Extrapolate.CLAMP,
    );

    const backgroundColor = interpolateColor(
      translationY.value,
      [0, 200],
      ['rgba(255, 0, 0, 0)', 'rgba(255, 0, 0, 1)'],
    );

    return {
      opacity,
      backgroundColor,
    };
  }, [translationY.value]);

  const headerStylez = useAnimatedStyle(() => {
    const opacity = interpolate(
      translationY.value,
      [0, 160],
      [0, 1],
      Extrapolate.CLAMP,
    );

    return {
      opacity,
    };
  }, [translationY.value]);

  const buttonStylez = useAnimatedStyle(() => {
    const left = interpolate(
      translationY.value,
      [0, Header_Distance],
      [Constants.scale15, Constants.scale10],
      Extrapolate.CLAMP,
    );

    return {
      left,
    };
  }, [translationY.value]);

  const wrapButtonStylez = useAnimatedStyle(() => {
    const opacity = interpolate(
      translationY.value,
      [0, Header_Distance],
      [0.6, 0],
      Extrapolate.CLAMP,
    );

    return {
      opacity,
    };
  }, [translationY.value]);

  const headerNameStylez = useAnimatedStyle(() => {
    const opacity = interpolate(
      translationY.value,
      [0, Header_Distance],
      [0, 1],
      Extrapolate.CLAMP,
    );

    return {
      opacity,
      flex: 1,
    };
  }, [translationY.value]);

  useLayoutEffect(() => {
    getBgColor(img);
  }, [img]);

  const getBgColor = useCallback(async (img: string) => {
    const blurHashColor = await getBlurhashColor(img);
    setBgColor(blurHashColor || Colors.grey.player);
  }, []);

  // if (!bgColor) return <></>;

  const FragmentView =
    bgColor === Colors.grey.player ? (
      <View />
    ) : (
      <Blurhash blurhash={bgColor} style={Layout.fill} />
    );

  const Header = useCallback(
    ({ bgColor, name, headerStylez, FragmentView }: any) => {
      return (
        <Animated.View
          style={[
            Layout.absolute,
            {
              backgroundColor: bgColor === Colors.grey.player ? bgColor : '',
            },
            styles.header,
          ]}>
          <Animated.View style={[Layout.fill]}>
            <Animated.View
              style={[Layout.center, styles.backBtn, buttonStylez]}>
              <Icon
                onPress={navigation.goBack}
                name="arrow-back"
                size={scale(24)}
                color={'white'}
                style={{ marginLeft: scale(1) }}
              />
              <Animated.View
                style={[Layout.absolute, styles.wrapBtn, wrapButtonStylez]}
              />
            </Animated.View>

            <Animated.View style={headerNameStylez}>
              <SemiBoldText textStyle={styles.headerName}>{name}</SemiBoldText>
            </Animated.View>
          </Animated.View>

          <Animated.View
            style={[Layout.absolute, headerStylez, { zIndex: -1 }]}>
            {FragmentView}
          </Animated.View>
        </Animated.View>
      );
    },
    [],
  );

  return (
    <>
      <Header
        bgColor={bgColor}
        name={name}
        headerStylez={headerStylez}
        FragmentView={FragmentView}
      />
      <Animated.View style={[styles.container, Layout.absolute, animatedStyle]}>
        <FastImage
          source={{ uri: img }}
          resizeMode="cover"
          style={[styles.background]}
        />
      </Animated.View>
    </>
  );
};

export const Banner = memo(BannerComponent, isEqual);

const styles = StyleSheet.create({
  container: {
    height: Header_Max_Height,
    justifyContent: 'flex-start',
    alignItems: 'center',
    zIndex: -1,
  },
  background: {
    width: '100%',
    height: '100%',
    paddingTop: 30,
    opacity: 0.9,
  },
  header: {
    zIndex: 1,
    height: Header_Min_Height,
  },
  backBtn: {
    height: scale(42),
    width: scale(42),
    borderRadius: scale(42) / 2,
    position: 'absolute',
    bottom: scale(4),
    zIndex: 2,
  },
  wrapBtn: {
    height: scale(42),
    width: scale(42),
    borderRadius: scale(42) / 2,
    zIndex: -2,
    backgroundColor: Colors.black.lighter1,
  },
  headerName: {
    position: 'absolute',
    bottom: scale(14),
    left: scale(62),
    fontSize: fontScale(16),
  },
});
