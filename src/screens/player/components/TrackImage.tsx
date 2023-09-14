import { StyleSheet, Image, View } from 'react-native'
import React, { useEffect, useMemo, useRef } from 'react'
import Animated, { Extrapolate, SharedValue, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { kWidth } from 'src/common/constants';
import { scale } from 'src/common/scale';
import Carousel from 'react-native-snap-carousel';
import { TrackDataItemFields } from 'src/models/Track';
import { findIndex } from 'lodash';
import Constants, { FULLSCREEN_HEIGHT, MINIPLAYER_HEIGHT } from 'src/themes/Constants';
import { useInsets } from 'src/common/animated';

interface Props {
    translationY: SharedValue<number>;
    trackQueue: TrackDataItemFields[];
    currentTrack: TrackDataItemFields;
    switchTrack: (options: 'next' | 'previous') => void
}
const ImageSize = kWidth - scale(50)
const CenterAlign = (MINIPLAYER_HEIGHT - Constants.scale35) / 2

const AnimatedImage = Animated.createAnimatedComponent(Image);

const TrackImage = React.memo(({ currentTrack, translationY, trackQueue, switchTrack }: Props) => {
    const insets = useInsets()

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
        const height = interpolate(translationY.value, [0, -FULLSCREEN_HEIGHT], [Constants.scale35, ImageSize], Extrapolate.CLAMP)
        const width = interpolate(translationY.value, [0, -FULLSCREEN_HEIGHT], [Constants.scale35, ImageSize], Extrapolate.CLAMP)

        return {
            // transform: [{ translateY }],
            height,
            width,
        }
    })

    const containerStylez = useAnimatedStyle(() => {
        const height = interpolate(translationY.value, [0, -FULLSCREEN_HEIGHT], [MINIPLAYER_HEIGHT, ImageSize], Extrapolate.CLAMP)
        const top = interpolate(translationY.value, [0, -FULLSCREEN_HEIGHT], [CenterAlign, Constants.scale80 + insets.top], Extrapolate.CLAMP)
        const left = interpolate(translationY.value, [0, -FULLSCREEN_HEIGHT], [Constants.scale15, Constants.scale25], Extrapolate.CLAMP)
        return {
            top,
            left,
            height,
        }
    })

    return (
        <Animated.View style={[containerStylez, { position: 'absolute' }]}>
            <Carousel
                ref={carouselRef}
                CellRendererComponent={null}
                scrollEnabled={-translationY.value >= FULLSCREEN_HEIGHT}
                windowSize={1}
                itemWidth={ImageSize}
                sliderWidth={ImageSize}
                itemHeight={ImageSize}
                sliderHeight={ImageSize}
                slideStyle={{ flex: 1 }}
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
        </Animated.View>
    );
});

export default TrackImage

const styles = StyleSheet.create({
    image: {
        borderRadius: scale(2),
    },

});