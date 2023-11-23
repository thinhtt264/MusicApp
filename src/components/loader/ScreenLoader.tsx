import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { MaterialIndicator } from 'react-native-indicators';
import { scale } from 'src/common/scale';
import Colors from 'src/themes/Colors';
import Layout from 'src/themes/Layout';

type Props = {};

const ScreenLoader = (props: Props) => {
  return (
    <View style={[Layout.center]}>
      <MaterialIndicator size={scale(50)} color={Colors.green.default} />
    </View>
  );
};

export default ScreenLoader;

const styles = StyleSheet.create({});
