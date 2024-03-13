import { StyleSheet, View } from 'react-native';
import React, { memo } from 'react';
import isEqual from 'react-fast-compare';
import Toast from 'react-native-toast-message';
import Layout from 'src/themes/Layout';
import { TAB_HEIGHT } from 'src/common/constants';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { fontScale, scale } from 'src/common/scale';
import Colors from 'src/themes/Colors';
import { BoldText } from '../text';

const toastConfig = {
  toastMessage: ({ text1 }: any) => (
    <View style={[Layout.rowCenter, styles.toast]}>
      <SimpleLineIcons
        name={'check'}
        size={scale(16)}
        style={styles.icon}
        color={Colors.white.default}
      />
      <BoldText textStyle={styles.text}>{text1}</BoldText>
    </View>
  ),
};

const SnackBarComponent = () => {
  return (
    <Toast
      config={toastConfig}
      bottomOffset={TAB_HEIGHT}
      position="bottom"
      visibilityTime={1500}
    />
  );
};
export const SnackBar = memo(SnackBarComponent, isEqual);

const styles = StyleSheet.create({
  toast: {
    marginHorizontal: scale(10),
    height: scale(37),
    backgroundColor: '#317e23',
    borderRadius: 50,
    paddingHorizontal: 20,
    gap: scale(5),
  },
  text: {
    color: Colors.white.default,
    fontSize: fontScale(14),
  },
  icon: {
    // marginRight: 10,
  },
});
