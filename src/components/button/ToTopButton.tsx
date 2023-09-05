import React, { memo } from 'react';
import equals from 'react-fast-compare';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { scale } from 'src/common/scale';
import Colors from 'src/themes/Colors';
import Layout from 'src/themes/Layout';
import { ButtonProps } from './type';

const ToTopButtonComponent = (props: ButtonProps) => {
  const { style, onPress, translationY } = props;

  const stylez = useAnimatedStyle(() => {
    if (translationY) {
      const opacity = interpolate(
        translationY?.value,
        [2000, 2040],
        [0, 1],
        Extrapolate.CLAMP,
      );
      return {
        opacity,
      };
    }
    return {
      opacity: 0,
    };
  });

  return (
    <Animated.View style={[styles.container, style, stylez]}>
      <TouchableOpacity
        style={[styles.button, Layout.center]}
        onPress={onPress}>
        <Icon
          name="arrow-upward"
          size={scale(22)}
          color={Colors.white.default}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 999,
    bottom: scale(80),
    right: scale(16),
  },
  button: {
    backgroundColor: Colors.green.default,
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
  },
});

export const ToTopButton = memo(ToTopButtonComponent, equals);