import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import { fontScale, scale } from 'src/common/scale';
import { BoldText, RegularText } from 'src/components/text';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Animated, { BounceIn, BounceOut } from 'react-native-reanimated';
import Colors from 'src/themes/Colors';

interface Props {
  artistName: string;
  trackName: string;
}

const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);
const AnimatedIcon1 = Animated.createAnimatedComponent(Ionicons);

const TrackInfo = ({ trackName = '', artistName = '' }: Props) => {
  const [liked, setLiked] = React.useState(false);

  const onPressIcon = () => {
    setLiked(prev => !prev);
  };

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
        {!liked ? (
          <AnimatedIcon1
            name={'heart-outline'}
            size={scale(28)}
            style={{ color: 'white' }}
            entering={BounceIn.duration(400)}
          />
        ) : (
          <AnimatedIcon
            name={'heart-sharp'}
            size={scale(28)}
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
    marginTop: scale(40),
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
    marginTop: scale(2),
  },
});
