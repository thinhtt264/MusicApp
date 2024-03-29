import React, { memo } from 'react';
import { StyleSheet, ActivityIndicator, View } from 'react-native';
import Colors from 'src/themes/Colors';
import { isIos } from 'src/common/device/index';
import { scale } from 'src/common/scale/index';

interface Props {
  page: number;
  totalPages: number;
}

const LoadMoreFooterComponent = ({ page, totalPages }: Props) => {
  if (
    page < totalPages &&
    page !== 0 &&
    totalPages > 10 &&
    totalPages - page >= 10
  ) {
    return (
      <ActivityIndicator
        style={styles.indicator}
        size="large"
        color={Colors.green.default}
      />
    );
  }
  return <View style={styles.divider} />;
};

export const LoadMoreFooter = LoadMoreFooterComponent;

const styles = StyleSheet.create({
  indicator: {
    marginVertical: scale(20),
    alignSelf: 'center',
    marginBottom: isIos ? scale(40) : 55,
  },
  divider: {
    height: scale(120),
  },
});
