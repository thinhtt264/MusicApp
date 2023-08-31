import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { RepeatMode } from 'react-native-track-player';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { checkRepeatMode, setRepeatMode, shuffle } from 'src/common/player';
import { scale } from 'src/common/scale';
import Colors from 'src/themes/Colors';

interface ShuffleRepeatButtonProps {
  option: 'shuffle' | 'repeat';
}

const ShuffleRepeatButton: React.FC<ShuffleRepeatButtonProps> = React.memo(
  ({ option }) => {
    const [applyOption, setstate] = useState(false);

    const onPressRepeat = () => {
      checkRepeatMode(mode => {
        if (mode === RepeatMode.Off) {
          setRepeatMode('Queue');
          setstate(true);
        } else {
          setRepeatMode('Off');
          setstate(false);
        }
      });
    };

    const getRepeatMode = () => {
      checkRepeatMode(mode => {
        if (mode === RepeatMode.Off) {
          setstate(false);
        } else {
          setstate(true);
        }
      });
    };

    const onPressShuffle = async () => await shuffle();

    const optionPress = option === 'shuffle' ? onPressShuffle : onPressRepeat;
    const iconName = option === 'shuffle' ? 'shuffle' : 'repeat';

    useEffect(() => {
      getRepeatMode();
    }, []);

    return (
      <TouchableOpacity onPress={optionPress}>
        <FontAwesome6
          name={iconName}
          size={scale(22)}
          color={
            applyOption && iconName !== 'shuffle'
              ? Colors.green.default
              : Colors.white.default
          }
        />
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({});

export default ShuffleRepeatButton;
