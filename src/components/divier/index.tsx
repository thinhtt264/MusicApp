import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { scale } from 'src/common/scale';

interface Props {
  width?: number;
  height?: number
}

const Divider = React.memo(({ height = 1, width = 0 }: Props) => {
  return <View style={{ height: scale(height), width: scale(width) }} />;
});

export default Divider;
