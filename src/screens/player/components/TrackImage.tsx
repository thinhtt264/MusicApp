import { StyleSheet, Image, View } from 'react-native'
import React from 'react'
import Animated, { SlideInLeft, SlideInRight, SlideOutLeft, SlideOutRight } from 'react-native-reanimated';
import { kWidth } from 'src/common/constants';
import { scale } from 'src/common/scale';

interface Props { url: string; option: 'next' | 'previous' }

const AnimatedImage = Animated.createAnimatedComponent(Image);
const TrackImage = React.memo(({ url, option }: Props) => {

    return (
        <Animated.View style={styles.image}>
            <AnimatedImage
                exiting={option === 'next' ? SlideOutLeft : SlideOutRight}
                entering={option === 'next' ? SlideInRight : SlideInLeft}
                source={{ uri: url }}
                style={{ flex: 1 }}
                resizeMode="cover"
            />
        </Animated.View>
    );
});

export default TrackImage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: scale(25),
    },
    image: {
        height: kWidth - scale(70),
        marginTop: scale(35),
        borderRadius: scale(4),
        justifyContent: 'center',
        alignItems: 'center',
        width: 300
    },

});