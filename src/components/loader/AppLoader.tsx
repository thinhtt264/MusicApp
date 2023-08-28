import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import Colors from 'src/themes/Colors';
import layout from 'src/themes/Layout';
import { scale } from 'src/common/scale';
import { useScreenController } from 'src/common/hooks';
import { WaveIndicator } from 'react-native-indicators';

const AppLoaderComponent = () => {
  const { translate } = useScreenController();
  return (
    <View
      style={[
        layout.fillAbsolute,
        layout.fullSize,
        layout.center,
        styles.container,
      ]}>
        <WaveIndicator size={scale(60)} color={Colors.white.default} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
  },
});

export const AppLoader = memo(AppLoaderComponent);
