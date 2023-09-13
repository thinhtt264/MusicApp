import React from 'react';
import Animated, { Extrapolate, cancelAnimation, interpolate, runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { TAB_HEIGHT, kHeight } from 'src/common/constants';
import { ScrollView, StyleSheet } from 'react-native';
import { PlayerScreen } from 'src/screens';


export const MINIPLAYER_HEIGHT = kHeight - TAB_HEIGHT
export const Miniplayer = () => {
    const translationY = useSharedValue(-MINIPLAYER_HEIGHT);

    const toggleFullScreen = () => {
        if (Math.abs(translationY.value) < MINIPLAYER_HEIGHT / 2) {
            translationY.value = withTiming((-MINIPLAYER_HEIGHT), { duration: 500 });
        } else {
            translationY.value = withTiming(0, { duration: 500 });
        }
    };

    const onEndDrag = () => {
        const distance = Math.abs(translationY.value);

        // Check if the distance is less than 50% of the MINIPLAYER_HEIGHT
        if (distance < (MINIPLAYER_HEIGHT * 50 / 100)) {  // Check if the distance is greater than 25% of the MINIPLAYER_HEIGHT
            if (distance > (MINIPLAYER_HEIGHT * 25 / 100)) {
                translationY.value = withTiming(-MINIPLAYER_HEIGHT, { duration: 500 });
            } else {
                translationY.value = withTiming(0, { duration: 500 });
            }
        }
        // Check if the distance is greater than or equal to 50% of the MINIPLAYER_HEIGHT
        else {
            if (distance < (MINIPLAYER_HEIGHT * 70 / 100)) { // Check if the distance is less than 70% of the MINIPLAYER_HEIGHT
                translationY.value = withTiming(0, { duration: 500 });
            } else {
                translationY.value = withTiming(-MINIPLAYER_HEIGHT, { duration: 500 });
            }
        }
    }

    const animatedStyle = useAnimatedStyle(() => {
        const heightz = interpolate(translationY.value, [0, -(MINIPLAYER_HEIGHT)], [TAB_HEIGHT, kHeight], Extrapolate.CLAMP);
        const bottomz = interpolate(translationY.value, [0, -(MINIPLAYER_HEIGHT)], [TAB_HEIGHT, 0], Extrapolate.CLAMP);
        return {
            bottom: bottomz,
            height: heightz
        };
    });

    const pangestureStyle = useAnimatedStyle(() => {
        const heightz = interpolate(translationY.value, [0, -(MINIPLAYER_HEIGHT)], [TAB_HEIGHT, TAB_HEIGHT + 30], Extrapolate.CLAMP);
        return {
            height: heightz,
            top: 0
        }
    })

    const gestureHandler = useAnimatedGestureHandler({
        onStart: (_, context) => {
            // Lưu giá trị ban đầu khi bắt đầu kéo
            context.startY = translationY.value;
            cancelAnimation(translationY);
        },
        onActive: (event, context) => {
            translationY.value = context.startY + event.translationY;
        },
        onEnd: (event) => {
            runOnJS(onEndDrag)();
        },
    });

    return (
        <Animated.View style={[styles.container, animatedStyle]}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} scrollEnabled={translationY.value >= MINIPLAYER_HEIGHT}>
                <PanGestureHandler onGestureEvent={gestureHandler}>
                    <Animated.View style={[{ backgroundColor: 'transparent', width: '100%', position: 'absolute', right: 0 }, pangestureStyle]} />
                </PanGestureHandler>
                <PlayerScreen translationY={translationY} />
            </ScrollView>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 999,
        width: '100%',
        backgroundColor: 'white',
        flex: 1,
    },
});