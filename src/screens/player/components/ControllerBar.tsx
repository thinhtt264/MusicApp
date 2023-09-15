import { StyleSheet, View } from 'react-native';
import React, { memo } from 'react';
import isEqual from 'react-fast-compare';
import { scale } from 'src/common/scale';
import { PlayPauseButton } from './PlayPauseButton';
import SkipButton from './SkipButton';
import ShuffleRepeatButton from './ShuffleRepeatButton';

interface Props {
  buffering: boolean;
  switchTrack: (option: 'next' | 'previous') => void;
  translationY: any;
}

const ControllerBarComponent = ({
  buffering,
  switchTrack,
  translationY,
}: Props) => {
  return (
    <View style={styles.container}>
      <ShuffleRepeatButton option="shuffle" translationY={translationY} />
      <SkipButton
        direction="previous"
        switchTrack={() => switchTrack('previous')}
        translationY={translationY}
      />
      <PlayPauseButton buffering={buffering} translationY={translationY} />
      <SkipButton
        direction="next"
        switchTrack={() => switchTrack('next')}
        translationY={translationY}
      />
      <ShuffleRepeatButton option="repeat" translationY={translationY} />
    </View>
  );
};

export const ControllerBar = memo(ControllerBarComponent, isEqual);

const styles = StyleSheet.create({
  container: {
    height: scale(50),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
