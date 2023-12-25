import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { memo } from 'react';
import Layout from 'src/themes/Layout';
import ShuffleRepeatButton from 'src/screens/player/components/ShuffleRepeatButton';
import { scale } from 'src/common/scale';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import Colors from 'src/themes/Colors';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import isEqual from 'react-fast-compare';
import LinearGradient from 'react-native-linear-gradient';
import { RegularText } from 'src/components/text';
import { formatNumber } from 'src/common/helper';
import { translate } from 'src/common/language/translate';
import Divider from 'src/components/divier';

type Props = {
  follower: number;
  bgColor: string;
};

const HeaderListComponent = ({ bgColor, follower }: Props) => {
  return (
    <View style={styles.wrapper}>
      <LinearGradient colors={[bgColor, 'black']} style={styles.gradient} />
      <View style={[styles.container]}>
        <RegularText textStyle={styles.follower}>
          {formatNumber(follower)} - {translate('search:folower')}
        </RegularText>
        <View style={[Layout.rowBetween]}>
          <View />
          <View style={[Layout.rowVCenter, { gap: scale(20) }]}>
            <ShuffleRepeatButton option="shuffle" size={scale(18)} />
            <Divider width={scale(30)} />
          </View>
        </View>
      </View>
    </View>
  );
};

export const HeaderList = memo(HeaderListComponent, isEqual);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: scale(10),
  },
  wrapper: {
    height: scale(80),
    width: '100%',
  },
  gradient: {
    flex: 1,
    opacity: 0.95,
    position: 'absolute',
    zIndex: -1,
    bottom: 0,
    left: 0,
    top: 0,
    right: 0,
  },
  follower: {
    color: Colors.white.default,
    marginTop: scale(8),
  },
});
