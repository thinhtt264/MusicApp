import React, { memo } from 'react';
import { StyleSheet, Text } from 'react-native';
import equals from 'react-fast-compare';
import { CustomTextProps } from './type';
import { fontScale, scale } from 'src/common/scale';
import { FONT_FAMILY } from 'src/common/constants';
import { useTheme } from '@react-navigation/native';

const BoldTextComponents = (props: CustomTextProps) => {
  const theme = useTheme();

  return (
    <Text
      allowFontScaling={false}
      {...props}
      style={[{ color: theme.colors.text }, styles.text, props.textStyle]}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontScale(14),
    fontWeight: 'bold',
    fontFamily: FONT_FAMILY.BOLD,
  },
});

export const BoldText = memo(BoldTextComponents, equals);
