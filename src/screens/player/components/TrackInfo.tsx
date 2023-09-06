import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import { fontScale, scale } from 'src/common/scale';
import { BoldText, RegularText } from 'src/components/text';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Animated, {
  Easing,
  interpolate,
  interpolateColor,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Colors from 'src/themes/Colors';
import { Path, Svg } from 'react-native-svg';

interface Props {
  artistName: string;
  trackName: string;
}

const AnimatedPath = Animated.createAnimatedComponent(Path);

const TrackInfo = ({ trackName = '', artistName = '' }: Props) => {
  const [liked, setLiked] = React.useState(false);
  const fill = useSharedValue(0);

  const onPressIcon = () => {
    setLiked(prev => !prev);
  };

  useEffect(() => {
    console.log(liked);
    fill.value = withTiming(liked ? 1 : 0,{});
    console.log(fill.value);
  }, [liked]);

  const animatedFill = interpolateColor(
    fill.value,
    [0, 1],
    ['transparent', 'green'],
  );
  const animatedStroke = interpolateColor(
    fill.value,
    [0, 1],
    ['white', 'green'],
  );

  useEffect(() => {
    console.log('ra');
    console.log(fill.value);
  }, [fill.value]);

  return (
    <View style={styles.container}>
      <View style={styles.trackInfo}>
        <BoldText numberOfLines={1} textStyle={styles.artist}>
          {trackName}
        </BoldText>
        <RegularText numberOfLines={1} textStyle={styles.name}>
          {artistName}
        </RegularText>
      </View>
      <TouchableOpacity activeOpacity={1} onPress={onPressIcon}>
        <Svg height={30} width={30} viewBox={`0 0 ${40} ${30}`}>
          <AnimatedPath
            d="M17.713 5.721 19 7.867l1.287-2.146C21.841 3.126 24.56 1.5 27.636 1.5c4.788 0 8.863 4.193 8.863 9.5 0 2.325-1.01 4.776-2.703 7.226-1.683 2.436-3.958 4.75-6.28 6.767-2.317 2.01-4.64 3.693-6.388 4.873a65.336 65.336 0 0 1-2.103 1.365l-.023.014a66.127 66.127 0 0 1-2.129-1.39c-1.748-1.187-4.072-2.878-6.389-4.896-2.323-2.023-4.599-4.34-6.283-6.773C2.508 15.739 1.5 13.3 1.5 11c0-5.307 4.075-9.5 8.864-9.5 3.075 0 5.794 1.626 7.35 4.221Z"
            fill={animatedFill}
            stroke={animatedStroke}
            strokeWidth={2}
          />
        </Svg>
      </TouchableOpacity>
    </View>
  );
};

export default TrackInfo;

const styles = StyleSheet.create({
  container: {
    marginTop: scale(30),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  trackInfo: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'baseline',
  },
  artist: {
    fontSize: fontScale(18),
  },
  name: {
    fontSize: fontScale(12),
  },
});
