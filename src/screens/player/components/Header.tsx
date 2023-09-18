import { StyleSheet, View } from 'react-native';
import React, { memo } from 'react';
import isEqual from 'react-fast-compare';
import { StyleProp } from 'react-native';
import { ViewStyle } from 'react-native';
import Layout from 'src/themes/Layout';
import { RegularText } from 'src/components/text';
import { fontScale, scale } from 'src/common/scale';
import { TouchableOpacity } from 'react-native';
import { translate } from 'src/common/language/translate';
import Animated, {
  Extrapolate,
  SharedValue,
  interpolate,
  runOnJS,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Constants, { FULLSCREEN_HEIGHT } from 'src/themes/Constants';
import { useInsets } from 'src/common/animated';

interface Props {
  from: 'search' | 'playlist';
  translationY: SharedValue<number>;
}

const HeaderComponent = (props: Props) => {
  const { from, translationY } = props;

  const insets = useInsets();
  const titleRender = () => {
    switch (from) {
      case 'search':
        return translate('player:fromSearch');
      default:
        break;
    }
  };

  const containerStyle = useAnimatedStyle(() => {
    const paddingVertical = interpolate(
      translationY.value,
      [0, -FULLSCREEN_HEIGHT],
      [0, Constants.scale20],
      Extrapolate.CLAMP,
    );
    const marginTop = interpolate(
      translationY.value,
      [0, -FULLSCREEN_HEIGHT],
      [-Constants.scale20, insets.top + 10],
      Extrapolate.CLAMP,
    );
    const translateY = interpolate(
      translationY.value,
      [0, -FULLSCREEN_HEIGHT],
      [-70, 0],
      Extrapolate.CLAMP,
    );
    const marginBottom = interpolate(
      translationY.value,
      [0, -FULLSCREEN_HEIGHT],
      [3, Constants.scale20],
      Extrapolate.CLAMP,
    );

    return {
      paddingVertical,
      marginTop,
      transform: [{ translateY }],
      marginBottom,
    };
  });

  return (
    <Animated.View
      style={[Layout.rowBetween, containerStyle, styles.container]}>
      <RegularText numberOfLines={1} textStyle={styles.title}>
        {titleRender()}
      </RegularText>
    </Animated.View>
  );
};

export const Header = memo(HeaderComponent, isEqual);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    justifyContent:'center'
  },
  title: {
    fontSize: fontScale(12),
    textAlignVertical: 'center',
    maxWidth: scale(200),
  },
});
