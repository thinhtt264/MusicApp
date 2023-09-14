import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import { fontScale, scale } from 'src/common/scale';
import { BoldText, RegularText } from 'src/components/text';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Animated, { BounceIn, BounceOut, Extrapolate, SharedValue, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import Colors from 'src/themes/Colors';
import Constants, { FULLSCREEN_HEIGHT, MINIPLAYER_HEIGHT } from 'src/themes/Constants';

interface Props {
  artistName: string;
  trackName: string;
  translationY: SharedValue<number>;
}

const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);
const AnimatedIcon1 = Animated.createAnimatedComponent(Ionicons);

const TrackInfo = ({ trackName = '', artistName = '', translationY }: Props) => {
  const [liked, setLiked] = React.useState(false);

  const onPressIcon = () => {
    setLiked(prev => !prev);
  };

  const nameStylez = useAnimatedStyle(() => {
    const fontSize = interpolate(translationY.value, [0, -FULLSCREEN_HEIGHT], [Constants.fontScale14, Constants.fontScale18], Extrapolate.CLAMP)
    return {
      fontSize
    }
  })

  const artitStylez = useAnimatedStyle(() => {
    const fontSize = interpolate(translationY.value, [0, -FULLSCREEN_HEIGHT], [Constants.fontScale10, Constants.fontScale14], Extrapolate.CLAMP)
    return {
      fontSize
    }
  })

  const trackStylez = useAnimatedStyle(() => {
    const height = interpolate(translationY.value, [0, -FULLSCREEN_HEIGHT], [MINIPLAYER_HEIGHT, MINIPLAYER_HEIGHT], Extrapolate.CLAMP)
    return {
      height
    }
  })


  return (
    <View style={styles.container}>
      <Animated.View style={[styles.trackInfo, trackStylez]}>
        <BoldText numberOfLines={1} textStyle={nameStylez}>
          {trackName}
        </BoldText>
        <RegularText numberOfLines={1} textStyle={artitStylez}>
          {artistName}
        </RegularText>
      </Animated.View>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPressIcon}
        style={styles.icon}>
        {!liked ? (
          <AnimatedIcon1
            name={'heart-outline'}
            size={scale(26)}
            style={{ color: 'white' }}
            entering={BounceIn.duration(400)}
          />
        ) : (
          <AnimatedIcon
            name={'heart-sharp'}
            size={scale(26)}
            style={{ color: Colors.green.default }}
            exiting={BounceOut.duration(400)}
            entering={BounceIn.duration(400)}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default TrackInfo;

const styles = StyleSheet.create({
  container: {
    // marginTop: scale(40),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  trackInfo: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginRight: scale(5),
  },
  artist: {
    fontSize: fontScale(12),
    marginTop: scale(2),
  },
  name: {
    fontSize: fontScale(18),
  },
  icon: {
    width: scale(30),
    height: scale(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
