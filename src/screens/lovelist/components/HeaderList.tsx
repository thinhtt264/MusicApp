import { StyleSheet, View } from 'react-native';
import React from 'react';
import Layout from 'src/themes/Layout';
import ShuffleRepeatButton from 'src/screens/player/components/ShuffleRepeatButton';
import { scale } from 'src/common/scale';
import Colors from 'src/themes/Colors';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

type Props = {};

const HeaderList = ({}: Props) => {
  return (
    <View style={[Layout.rowVCenter, styles.container]}>
      <FontAwesome6
        size={scale(18)}
        style={[{ marginLeft: scale(2) }]}
        name={'download'}
        color={Colors.unActive}
      />
      <View style={[Layout.rowVCenter, styles.wrapIcon]}>
        <ShuffleRepeatButton option="shuffle" size={scale(22)} />
      </View>
    </View>
  );
};

export default HeaderList;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    marginBottom: scale(20),
  },
  wrapIcon: {
    gap: scale(20),
    marginRight: scale(48),
  },
});
