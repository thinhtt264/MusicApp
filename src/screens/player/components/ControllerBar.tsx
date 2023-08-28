import { StyleSheet, Text, View } from 'react-native';
import React, { memo } from 'react';
import isEqual from 'react-fast-compare';
import { kWidth } from 'src/common/constants';
import { scale } from 'src/common/scale';
import { PlayPauseButton } from './PlayPauseButton';
import SkipButton from './SkipButton';
import ShuffleRepeatButton from './ShuffleRepeatButton';

interface Props {
  buffering: boolean;
}

const ControllerBarComponent = ({ buffering }: Props) => {
  
  return (
    <View style={styles.container}>
      <ShuffleRepeatButton option="shuffle" />
      <SkipButton direction="previous" />
      <PlayPauseButton buffering={buffering} />
      <SkipButton direction="next" />
      <ShuffleRepeatButton option="repeat" />
    </View>
  );
};

export const ControllerBar = memo(ControllerBarComponent, isEqual);

const styles = StyleSheet.create({
  container: {
    height: scale(50),
    width: kWidth - scale(70),
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
