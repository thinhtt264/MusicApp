import { StyleSheet, Text, View, StyleProp, ViewStyle } from 'react-native'
import React, { memo } from 'react'
import TrackPlayer, { useProgress } from 'react-native-track-player'
import isEqual from 'react-fast-compare'
import Slider, { SliderProps } from '@react-native-community/slider'
import { scale } from 'src/common/scale'

interface Props extends SliderProps {
    style?: StyleProp<ViewStyle>
}

const ProgressBarComponent = ({ style, ...props }: Props) => {
    const { position, duration } = useProgress();

    return (
        <View style={style}>
            <Slider
                style={styles.slider}
                value={position}
                minimumValue={0}
                maximumValue={duration}
                thumbTintColor="#FFD479"
                minimumTrackTintColor="#FFD479"
                maximumTrackTintColor="#FFFFFF"
                onSlidingComplete={TrackPlayer.seekTo}
                {...props}
            />
        </View>
    )
}

export const ProgressBar = memo(ProgressBarComponent, isEqual)

const styles = StyleSheet.create({
    slider: {
        height: scale(40),
        flexDirection: 'row',
        width: '100%'
    },
})