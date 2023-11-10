import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { memo } from 'react';
import { isEqual } from 'lodash';
import Layout from 'src/themes/Layout';
import { AnimatedImage } from 'src/components/image';
import { BoldText, RegularText } from 'src/components/text';
import { fontScale, scale } from 'src/common/scale';
import { Spacer } from 'src/components/spacer';
import { translate } from 'src/common/language/translate';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

type Props = {
  item: {
    id: string;
    img: string;
    name: string;
    total: number;
  };
  onNavigate: (data: { id: string; name: string; total: number }) => void;
};
const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const PlaylistCardComponent = ({ item, onNavigate }: Props) => {
  const scaleAble = useSharedValue<number>(1);

  const onPressIn = () => {
    scaleAble.value = withSpring(0.95);
  };

  const onPressOut = () => {
    scaleAble.value = withSpring(1);
  };

  const stylez = useAnimatedStyle(() => {
    const scale = interpolate(scaleAble.value, [0.8, 1], [1.1, 1]);

    return {
      transform: [{ scale }],
      paddingLeft: 5,
    };
  });

  return (
    <AnimatedTouchableOpacity
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={[Layout.rowVCenter, stylez]}
      activeOpacity={1}
      onPress={() =>
        onNavigate({ id: item.id, name: item.name, total: item.total })
      }>
      <AnimatedImage
        source={item.img}
        resizeMode="cover"
        containerStyle={styles.img}
      />
      <View style={[Layout.colVCenter, styles.cardInfo]}>
        <BoldText>{item.name}</BoldText>
        <Spacer size={scale(5)} />
        <RegularText>
          {item.total} {translate('library:song').toLowerCase()}
        </RegularText>
      </View>
    </AnimatedTouchableOpacity>
  );
};

export const PlaylistCard = memo(PlaylistCardComponent, isEqual);

const styles = StyleSheet.create({
  img: {
    height: scale(50),
    width: scale(50),
  },
  cardInfo: {
    marginLeft: scale(10),
  },
});
