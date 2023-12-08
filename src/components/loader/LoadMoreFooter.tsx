import React, { memo } from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import Colors from 'src/themes/Colors';
import { isIos } from 'src/common/device/index';
import { scale } from 'src/common/scale/index';

interface Props {
  page: number;
  totalPages: number;
}

const LoatMoreFooterComponent = ({ page, totalPages }: Props) => {
  if (page < totalPages && page !== 1 && totalPages > 10) {
    return (
      <ActivityIndicator
        style={styles.indicator}
        size="large"
        color={Colors.green.default}
      />
    );
  }
  return null;
};

export const LoatMoreFooter = LoatMoreFooterComponent;

const styles = StyleSheet.create({
  indicator: {
    marginVertical: scale(20),
    alignSelf: 'center',
    marginBottom: isIos ? scale(40) : 55,
  },
});
