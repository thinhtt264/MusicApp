import React, { memo } from 'react';
import { StyleSheet, Text } from 'react-native';
import equals from 'react-fast-compare';
import { CustomTextProps } from './type';
import { fontScale, scale } from 'src/common/scale';
import { FONT_FAMILY } from 'src/common/constants';
import Colors from 'src/themes/Colors';

const SemiBoldTextComponents = (props: CustomTextProps) => {
  return (
    <Text
      allowFontScaling={false}
      {...props}
      style={[styles.text, props.textStyle]}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontScale(14),
    fontWeight: '600',
    fontFamily: FONT_FAMILY.SEMI_BOLD,
  },
});

export const SemiBoldText = memo(SemiBoldTextComponents, equals);
