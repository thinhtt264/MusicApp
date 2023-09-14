import React from 'react';
import Animated, { Extrapolate, cancelAnimation, interpolate, runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { TAB_HEIGHT, kHeight } from 'src/common/constants';
import { ScrollView, StyleSheet } from 'react-native';
import { PlayerScreen } from 'src/screens';
import Constants, { FULLSCREEN_HEIGHT, MINIPLAYER_HEIGHT } from 'src/themes/Constants';
import { scale } from 'src/common/scale';
import Layout from 'src/themes/Layout';


export const Miniplayer = () => {
    const translationY = useSharedValue(0);

    const toggleFullScreen = () => {
        if (Math.abs(translationY.value) < FULLSCREEN_HEIGHT / 2) {
            translationY.value = withTiming((-FULLSCREEN_HEIGHT), { duration: 500 });
        } else {
            translationY.value = withTiming(0, { duration: 500 });
        }
    };

    const onEndDrag = () => {

        const distance = Math.abs(translationY.value);

        // Check if the distance is less than 50% of the FULLSCREEN_HEIGHT
        if (distance < (FULLSCREEN_HEIGHT * 50 / 100)) {
            if (distance > (FULLSCREEN_HEIGHT * 25 / 100)) { // Check if the distance is greater than 25% of the FULLSCREEN_HEIGHT
                translationY.value = withTiming(-FULLSCREEN_HEIGHT, { duration: 500 });
            } else {
                translationY.value = withTiming(0, { duration: 500 });
            }
        }
        // Check if the distance is greater than or equal to 50% of the FULLSCREEN_HEIGHT
        else {
            if (distance < (FULLSCREEN_HEIGHT * 75 / 100)) { // Check if the distance is less than 75% of the FULLSCREEN_HEIGHT
                translationY.value = withTiming(0, { duration: 500 });
            } else {
                translationY.value = withTiming(-FULLSCREEN_HEIGHT, { duration: 500 });
            }
        }
    }

    const animatedStyle = useAnimatedStyle(() => {
        const heightz = interpolate(translationY.value, [0, -(FULLSCREEN_HEIGHT)], [MINIPLAYER_HEIGHT, kHeight], Extrapolate.CLAMP);
        const bottomz = interpolate(translationY.value, [0, -(FULLSCREEN_HEIGHT)], [TAB_HEIGHT, 0], Extrapolate.CLAMP);
        const marginHorizontal = interpolate(translationY.value, [0, -(FULLSCREEN_HEIGHT)], [Constants.scale15, 0], Extrapolate.CLAMP);
        return {
            bottom: bottomz,
            height: heightz,
            marginHorizontal
        };
    });

    const pangestureStyle = useAnimatedStyle(() => {
        // const heightz = interpolate(translationY.value, [0, -(FULLSCREEN_HEIGHT)], [MINIPLAYER_HEIGHT, MINIPLAYER_HEIGHT + 40], Extrapolate.CLAMP);
        return {
            height: translationY.value === -FULLSCREEN_HEIGHT ? MINIPLAYER_HEIGHT + 40 : MINIPLAYER_HEIGHT,
            top: 0
        }
    })

    const playerStylez = useAnimatedStyle(() => {
        const height = interpolate(translationY.value, [0, -(FULLSCREEN_HEIGHT)], [MINIPLAYER_HEIGHT, kHeight], Extrapolate.CLAMP);
        return {
            height
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
        <Animated.View style={[styles.container, animatedStyle, Layout.shadow]}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} scrollEnabled={translationY.value >= FULLSCREEN_HEIGHT}>
                <PanGestureHandler onGestureEvent={gestureHandler}>
                    <Animated.View style={[{ backgroundColor: 'transparent', width: '100%', position: 'absolute', right: 0, zIndex: 99 }, pangestureStyle]} />
                </PanGestureHandler>
                <Animated.View style={playerStylez}>
                    <PlayerScreen translationY={translationY} />
                </Animated.View>
            </ScrollView>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 999,
    },
});