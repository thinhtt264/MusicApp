import { StyleSheet, Text, View, StyleProp, ViewStyle } from 'react-native'
import React, { memo } from 'react'
import TrackPlayer, { useProgress } from 'react-native-track-player'
import isEqual from 'react-fast-compare'
import Slider, { SliderProps } from '@react-native-community/slider'
import { scale } from 'src/common/scale'
import { kWidth } from 'src/common/constants'
import { Spacer } from 'src/components/spacer'
import Colors from 'src/themes/Colors'

interface Props extends SliderProps {
    style?: StyleProp<ViewStyle>
}

const ProgressBarComponent = ({ style, ...props }: Props) => {
    const { position, duration } = useProgress();

    const formatSeconds = (time: number) =>
        new Date(time * 1000).toISOString().slice(14, 19);

    console.log(duration);
    console.log(position);

    return (
        <View style={[styles.container, style]}>
            <>
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

                <View style={styles.labelContainer}>
                    <Text style={styles.labelText}>{formatSeconds(position)}</Text>
                    <Spacer mode={'expand'} />
                    <Text style={styles.labelText}>
                        {formatSeconds(Math.max(0, duration - position))}
                    </Text>
                </View></>
        </View>
    )
}

export const ProgressBar = memo(ProgressBarComponent, isEqual)

const styles = StyleSheet.create({
    slider: {
        width: kWidth - scale(40),
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    }, labelContainer: {
        flexDirection: 'row',
    },
    labelText: {
        color: Colors.unActive,
    },
})