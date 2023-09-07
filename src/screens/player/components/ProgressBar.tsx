import { StyleSheet, Text, View, StyleProp, ViewStyle } from 'react-native';
import React, { memo, useEffect } from 'react';
import TrackPlayer, { useProgress } from 'react-native-track-player';
import isEqual from 'react-fast-compare';
import Slider, { SliderProps } from '@react-native-community/slider';
import { scale } from 'src/common/scale';
import { kWidth } from 'src/common/constants';
import { Spacer } from 'src/components/spacer';
import Colors from 'src/themes/Colors';
import { dispatch } from 'src/common/redux';
import { appActions } from 'src/store/action-slices';

interface Props extends SliderProps {
  style?: StyleProp<ViewStyle>;
}

const formatSeconds = (time: number) =>
  new Date(time * 1000).toISOString().slice(14, 19);

const ProgressBarComponent = ({ style, ...props }: Props) => {
  const { position, duration, buffered } = useProgress();

  const forceValuePosition = position >= duration ? 0 : position;

  useEffect(() => {
    if (buffered >= position && position !== duration) {
      dispatch(appActions.onSetLoadApp(false));
    }
  }, [position, buffered]);

  return (
    <View style={[styles.container, style]}>
      <>
        <Slider
          style={styles.slider}
          value={forceValuePosition}
          minimumValue={0}
          maximumValue={duration}
          thumbTintColor={Colors.white.default}
          minimumTrackTintColor={Colors.white.default}
          maximumTrackTintColor="#FFFFFF"
          onSlidingComplete={value => {
            TrackPlayer.seekTo(value);
          }}
          {...props}
        />

        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>
            {formatSeconds(forceValuePosition)}
          </Text>
          <Spacer mode={'expand'} />
          <Text style={styles.labelText}>
            {formatSeconds(Math.max(0, duration - forceValuePosition))}
          </Text>
        </View>
      </>
    </View>
  );
};

export const ProgressBar = memo(ProgressBarComponent, isEqual);

const styles = StyleSheet.create({
  slider: {
    width: kWidth - scale(24),
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: scale(5),
  },
  labelContainer: {
    flexDirection: 'row',
    marginHorizontal: -scale(10),
  },
  labelText: {
    color: Colors.white.default,
  },
});
