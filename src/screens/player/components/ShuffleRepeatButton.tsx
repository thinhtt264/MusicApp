import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, StyleSheet, ViewProps } from 'react-native';
import Animated, {
  Extrapolate,
  SharedValue,
  interpolate,
  runOnJS,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { RepeatMode } from 'react-native-track-player';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { checkRepeatMode, setRepeatMode, shuffle } from 'src/common/player';
import { scale } from 'src/common/scale';
import Colors from 'src/themes/Colors';
import { FULLSCREEN_HEIGHT } from 'src/themes/Constants';

interface ShuffleRepeatButtonProps {
  option: 'shuffle' | 'repeat';
  translationY?: SharedValue<number>;
  size?: number;
}

const AnimatedButton = Animated.createAnimatedComponent(TouchableOpacity);

const IconHeight = scale(22);
const IconWidth = scale(26);

const ShuffleRepeatButton: React.FC<ShuffleRepeatButtonProps> = React.memo(
  ({ option, translationY, size = scale(20) }) => {
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

    const onPressShuffle = async () => {
      setstate(prev => !prev);
      // await shuffle();
    };

    const optionPress = option === 'shuffle' ? onPressShuffle : onPressRepeat;
    const iconName = option === 'shuffle' ? 'shuffle' : 'repeat';

    useEffect(() => {
      getRepeatMode();
    }, []);

    const animatedStylez = useAnimatedStyle(() => {
      if (!translationY) return {};

      const height = interpolate(
        translationY.value,
        [0, -FULLSCREEN_HEIGHT],
        [0, IconHeight],
        Extrapolate.CLAMP,
      );
      const width = interpolate(
        translationY.value,
        [0, -FULLSCREEN_HEIGHT],
        [0, IconWidth],
        Extrapolate.CLAMP,
      );

      // const translateX = interpolate(
      //   translationY.value,
      //   [0, -FULLSCREEN_HEIGHT],
      //   [option === 'repeat' ? 400 : -400, 0],
      //   Extrapolate.CLAMP,
      // );
      return {
        height,
        width,
        // transform: [{ translateX }],
      };
    });

    return (
      <AnimatedButton
        onPress={optionPress}
        style={[animatedStylez, styles.container]}>
        <FontAwesome6
          name={iconName}
          size={size}
          color={applyOption ? Colors.green.default : Colors.white.default}
        />
      </AnimatedButton>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ShuffleRepeatButton;
