import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Layout from 'src/themes/Layout';
import ShuffleRepeatButton from 'src/screens/player/components/ShuffleRepeatButton';
import { scale } from 'src/common/scale';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import Colors from 'src/themes/Colors';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

type Props = {
  onPlayQueue: () => void;
};

const HeaderList = ({ onPlayQueue }: Props) => {
  return (
    <View style={[Layout.rowVCenter, styles.container]}>
      <FontAwesome6
        size={scale(18)}
        style={[{ marginLeft: scale(2) }]}
        name={'download'}
        color={Colors.unActive}
      />
      <View style={[Layout.rowVCenter, { gap: scale(20) }]}>
        <ShuffleRepeatButton option="shuffle" size={scale(22)} />
        <TouchableOpacity onPress={onPlayQueue}>
          <Animated.View
            style={[styles.playButton]}
            entering={FadeIn.duration(500)}
            exiting={FadeOut}>
            <FontAwesome6
              size={scale(20)}
              style={[{ marginLeft: scale(2) }]}
              name={'play'}
              color={Colors.black.default}
            />
          </Animated.View>
        </TouchableOpacity>
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
  playButton: {
    height: scale(48),
    width: scale(48),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.green.default,
    borderRadius: scale(25),
  },
});
