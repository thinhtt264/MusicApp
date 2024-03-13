import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Animated, {
  Easing,
  withTiming,
  interpolate,
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
} from 'react-native-reanimated';

const TickerText = () => {
  const text = 'Chữ chạy trong React Native adwdqdqwdqwdqwdqwdqwd';
  const speed = 59; // Tốc độ chạy (ms)
  const visibleChars = 10; // Số ký tự hiển thị
  const offset = useSharedValue(0);

  const startAnimation = () => {
    offset.value = withTiming(
      1,
      { duration: text.length * speed, easing: Easing.linear },
      finished => {
        if (finished) {
          offset.value = 0;
          runOnJS(startAnimation)();
        }
      },
    );
  };

  React.useEffect(() => {
    startAnimation();
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      offset.value,
      [0, 1],
      [0, -(text.length * visibleChars)],
      'clamp',
    );

    return {
      transform: [{ translateX }],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.tickerContainer, animatedStyle]}>
        <Text style={styles.tickerText}>{text}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tickerContainer: {
    overflow: 'hidden',
  },
  tickerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'blue',
  },
});

export default TickerText;
