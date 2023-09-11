import { StyleSheet, Image, View } from 'react-native'
import React from 'react'
import Animated, { SlideInLeft, SlideInRight, SlideOutLeft, SlideOutRight } from 'react-native-reanimated';
import { kWidth } from 'src/common/constants';
import { scale } from 'src/common/scale';

interface Props { url: string; option: 'next' | 'previous' }

const TrackImage = React.memo(({ url, option }: Props) => {
    const AnimatedImage = Animated.createAnimatedComponent(Image);

    return (
        <AnimatedImage
            exiting={option === 'next' ? SlideOutLeft : SlideOutRight}
            entering={option === 'next' ? SlideInRight : SlideInLeft}
            source={{ uri: url }}
            style={[styles.image]}
            resizeMode="cover"
        />
    );
});

export default TrackImage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        paddingHorizontal: scale(25),
    },
    image: {
        height: kWidth - scale(70),
        marginTop: scale(35),
        borderRadius: scale(4),
        justifyContent: 'center',
        alignItems: 'center',
    },

});