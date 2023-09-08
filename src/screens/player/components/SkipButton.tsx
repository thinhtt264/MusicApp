import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { scale } from '../../../common/scale/index';
import Colors from 'src/themes/Colors';

interface SkipButtonProps {
  direction: 'previous' | 'next';
  switchTrack: () => void;
}

const SkipButton: React.FC<SkipButtonProps> = React.memo(
  ({ direction, switchTrack }) => {
    const iconName =
      direction === 'previous' ? 'backward-step' : 'forward-step';

    return (
      <TouchableOpacity onPress={switchTrack}>
        <FontAwesome6
          name={iconName}
          size={scale(22)}
          color={Colors.white.default}
        />
      </TouchableOpacity>
    );
  },
);

export default SkipButton;

const styles = StyleSheet.create({});
