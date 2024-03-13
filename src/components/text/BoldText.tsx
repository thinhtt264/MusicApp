import React, { memo } from 'react';
import { StyleSheet, Text } from 'react-native';
import { CustomTextProps } from './type';
import { fontScale, scale } from 'src/common/scale';
import { FONT_FAMILY } from 'src/common/constants';
import { useTheme } from '@react-navigation/native';
import Animated from 'react-native-reanimated';
import isEqual from 'react-fast-compare';

const BoldTextComponents = (props: CustomTextProps) => {
  const theme = useTheme();
  const AnimatedText = Animated.Text;

  return (
    <AnimatedText
      allowFontScaling={false}
      {...props}
      style={[{ color: theme.colors.text }, styles.text, props.textStyle]}>
      {props.children}
    </AnimatedText>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontScale(14),
    fontWeight: 'bold',
    fontFamily: FONT_FAMILY.BOLD,
  },
});

export const BoldText = memo(BoldTextComponents, isEqual);
