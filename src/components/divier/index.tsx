import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { scale } from 'src/common/scale';

interface Props {
  width?: number;
}

const Divider = React.memo(({ width = 0 }: Props) => {
  return <View style={{ height: scale(1), width: scale(width) }} />;
});

export default Divider;
