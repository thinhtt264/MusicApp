import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import { fontScale, scale } from 'src/common/scale';
import { BoldText, RegularText } from 'src/components/text';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Animated, {
  BounceIn,
  BounceOut,
  Extrapolate,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Colors from 'src/themes/Colors';
import Constants, {
  FULLSCREEN_HEIGHT,
  MINIPLAYER_HEIGHT,
} from 'src/themes/Constants';

interface Props {
  artistName: string;
  trackName: string;
  translationY: SharedValue<number>;
}

const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);
const AnimatedIcon1 = Animated.createAnimatedComponent(Ionicons);
const AnimatedButton = Animated.createAnimatedComponent(TouchableOpacity);

const TrackInfo = ({
  trackName = '',
  artistName = '',
  translationY,
}: Props) => {
  const [liked, setLiked] = React.useState(false);

  const onPressIcon = () => {
    setLiked(prev => !prev);
  };

  const nameStylez = useAnimatedStyle(() => {
    const fontSize = interpolate(
      translationY.value,
      [0, -FULLSCREEN_HEIGHT],
      [Constants.fontScale14, Constants.fontScale18],
      Extrapolate.CLAMP,
    );
    return {
      fontSize,
    };
  });

  const artitStylez = useAnimatedStyle(() => {
    const fontSize = interpolate(
      translationY.value,
      [0, -FULLSCREEN_HEIGHT],
      [Constants.fontScale11, Constants.fontScale14],
      Extrapolate.CLAMP,
    );
    return {
      fontSize,
    };
  });

  const trackStylez = useAnimatedStyle(() => {
    const height = interpolate(
      translationY.value,
      [0, -FULLSCREEN_HEIGHT],
      [Constants.scale40, MINIPLAYER_HEIGHT],
      Extrapolate.CLAMP,
    );
    return {
      height,
    };
  });

  const iconStylez = useAnimatedStyle(() => {
    const height = interpolate(
      translationY.value,
      [0, -FULLSCREEN_HEIGHT],
      [0, Constants.scale30],
      Extrapolate.CLAMP,
    );
    const width = interpolate(
      translationY.value,
      [0, -FULLSCREEN_HEIGHT],
      [0, Constants.scale30],
      Extrapolate.CLAMP,
    );
    return {
      height,
      width,
    };
  });

  return (
    <View style={styles.container}>
      <View
        style={{
          height: MINIPLAYER_HEIGHT,
          justifyContent: 'center',
          paddingVertical: 5,
        }}>
        <Animated.View style={[styles.trackInfo, trackStylez]}>
          <BoldText numberOfLines={1} textStyle={nameStylez}>
            {trackName}
          </BoldText>
          <RegularText numberOfLines={1} textStyle={artitStylez}>
            {artistName}
          </RegularText>
        </Animated.View>
      </View>

      <AnimatedButton
        activeOpacity={1}
        onPress={onPressIcon}
        style={[styles.icon, iconStylez]}>
        {!liked ? (
          <AnimatedIcon1
            name={'heart-outline'}
            size={scale(26)}
            color={'white'}
            entering={BounceIn.duration(400)}
          />
        ) : (
          <AnimatedIcon
            name={'heart-sharp'}
            size={scale(26)}
            color={Colors.green.default}
            exiting={BounceOut.duration(400)}
            entering={BounceIn.duration(400)}
          />
        )}
      </AnimatedButton>
    </View>
  );
};

export default TrackInfo;

const styles = StyleSheet.create({
  container: {
    // marginTop: scale(40),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
  },
  trackInfo: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  artist: {
    fontSize: fontScale(12),
    marginTop: scale(2),
  },
  name: {
    fontSize: fontScale(18),
  },
  icon: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
