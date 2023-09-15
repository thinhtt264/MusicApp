import { StyleSheet, Image } from 'react-native'
import React, { useEffect, useMemo, useRef } from 'react'
import Animated, { Extrapolate, SharedValue, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { kWidth } from 'src/common/constants';
import { scale } from 'src/common/scale';
import Carousel from 'react-native-snap-carousel';
import { TrackDataItemFields } from 'src/models/Track';
import { findIndex } from 'lodash';
import Constants, { FULLSCREEN_HEIGHT, MINIPLAYER_HEIGHT } from 'src/themes/Constants';

interface Props {
    translationY: SharedValue<number>;
    trackQueue: TrackDataItemFields[];
    currentTrack: TrackDataItemFields;
    switchTrack: (options: 'next' | 'previous') => void
}
const ImageSize = kWidth - scale(50)

const AnimatedImage = Animated.createAnimatedComponent(Image);
const AnimatedCarousel = Animated.createAnimatedComponent(Carousel);

const TrackImage = React.memo(({ currentTrack, translationY, trackQueue, switchTrack }: Props) => {
    const carouselRef = useRef<any>(null);
    const index = useMemo(() => findIndex(trackQueue, { id: currentTrack.id }), [currentTrack.id])

    useEffect(() => {
        if (index !== -1) {
            carouselRef.current?.snapToItem(index)
        }
    }, [index])

    const onSnap = (slideIndex: number) => {
        if (index === slideIndex) return
        if (index > slideIndex) {
            switchTrack('previous')
        } else if (index < slideIndex) {
            switchTrack('next')
        }
    }


    const imageStylez = useAnimatedStyle(() => {
        // const translateY = interpolate(translationY.value, [0, -FULLSCREEN_HEIGHT], [0, 0], Extrapolate.CLAMP)
        const height = interpolate(translationY.value, [0, -FULLSCREEN_HEIGHT], [Constants.scale40, ImageSize], Extrapolate.CLAMP)
        const width = interpolate(translationY.value, [0, -FULLSCREEN_HEIGHT], [Constants.scale40, ImageSize], Extrapolate.CLAMP)
        const borderRadius = interpolate(translationY.value, [0, -FULLSCREEN_HEIGHT], [0, Constants.scale10], Extrapolate.CLAMP)

        return {
            // transform: [{ translateY }],
            height,
            width,
            marginTop: 0,
            borderRadius
        }
    })

    const slideAnimatedStylez = () => {
        const height = interpolate(translationY.value, [0, -FULLSCREEN_HEIGHT], [MINIPLAYER_HEIGHT, ImageSize], Extrapolate.CLAMP)
        const width = interpolate(translationY.value, [0, -FULLSCREEN_HEIGHT], [ImageSize, ImageSize], Extrapolate.CLAMP)
        const marginLeft = interpolate(translationY.value, [0, -FULLSCREEN_HEIGHT], [Constants.scale10, Constants.scale25], Extrapolate.CLAMP)

        return {
            height,
            width,
            justifyContent: 'center',
            marginLeft,
        }
    }

    return (
        <AnimatedCarousel
            ref={carouselRef}
            CellRendererComponent={null}
            scrollEnabled={-translationY.value >= FULLSCREEN_HEIGHT}
            windowSize={1}
            itemWidth={kWidth}
            sliderWidth={kWidth}
            slideInterpolatedStyle={slideAnimatedStylez}
            data={trackQueue}
            onBeforeSnapToItem={onSnap}
            renderItem={({ item }: any) =>
                <AnimatedImage
                    source={{ uri: item.album.images[0].url }}
                    style={[imageStylez, styles.image]}
                    resizeMode="cover"
                />
            }
        />
    );
});

export default TrackImage

const styles = StyleSheet.create({
    image: {
    },
    container: {
        justifyContent: 'center',
        alignItems: "center",
    }
});