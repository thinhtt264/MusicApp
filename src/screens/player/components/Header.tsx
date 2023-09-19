import { StyleSheet, View } from 'react-native';
import React, { memo } from 'react';
import isEqual from 'react-fast-compare';
import Layout from 'src/themes/Layout';
import { RegularText } from 'src/components/text';
import { fontScale, scale } from 'src/common/scale';
import { translate } from 'src/common/language/translate';
import Animated, {
  Extrapolate,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Constants, { FULLSCREEN_HEIGHT } from 'src/themes/Constants';
import { useInsets } from 'src/common/animated';
import { useAppSelector } from 'src/common/redux';

interface Props {
  translationY: SharedValue<number>;
}
const spaceSize = scale(4);
const HeaderComponent = (props: Props) => {
  const { currentTrack } = useAppSelector(state => state.player);
  const { translationY } = props;

  const insets = useInsets();
  const titleRender = () => {
    switch (currentTrack.playFrom) {
      case 'search':
        return translate('player:fromSearch');
      case 'recommend':
        return translate('player:fromRecommend');
      default:
        return translate('player:fromSearch');
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
      [spaceSize, Constants.scale20], //chỉnh khoảng cách trên track image
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
      <RegularText
        numberOfLines={1}
        textStyle={styles.title}
        ellipsizeMode="tail">
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
    justifyContent: 'center',
  },
  title: {
    fontSize: fontScale(12),
    textAlignVertical: 'center',
    maxWidth: scale(200),
  },
});
