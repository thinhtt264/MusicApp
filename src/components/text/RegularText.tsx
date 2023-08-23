import React, { memo } from 'react';
import { StyleSheet, Text } from 'react-native';
import equals from 'react-fast-compare';
import { fontScale, scale } from 'src/common/scale';
import { FONT_FAMILY } from 'src/common/constants';
import Colors from 'src/themes/Colors';
import { CustomTextProps } from './type';

const RegularTextComponents = (props: CustomTextProps) => {
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
    fontFamily: FONT_FAMILY.REGULAR,
    color: Colors.black.default,
  },
});

export const RegularText = memo(RegularTextComponents, equals);
