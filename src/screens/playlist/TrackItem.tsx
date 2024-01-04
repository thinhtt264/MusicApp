import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { memo } from 'react';
import Layout from 'src/themes/Layout';
import { BoldText, MediumText } from 'src/components/text';
import { fontScale, scale } from 'src/common/scale';
import { TrackDataItemFields } from 'src/models/Track';
import Colors from 'src/themes/Colors';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import isEqual from 'react-fast-compare';
import { AnimatedImage } from 'src/components/image';

type Props = {
  item: any;
  tracks: TrackDataItemFields[];
  openBottomModal: (item: TrackDataItemFields) => void;
  onPlayTrack: (item: TrackDataItemFields) => void;
};
const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const TrackItemComponent = ({
  tracks,
  item,
  openBottomModal,
  onPlayTrack,
}: Props) => {
  const HeaderList = (name: string) => {
    return <BoldText textStyle={styles.header}>{name}</BoldText>;
  };

  return (
    <FlatList
      renderItem={({ item, index }) => (
        <RenderItem
          openBottomModal={openBottomModal}
          onPlayTrack={onPlayTrack}
          item={item}
          index={index}
        />
      )}
      data={tracks}
      keyExtractor={(item, index) => index.toString()}
      ItemSeparatorComponent={() => <View style={styles.divider} />}
      ListHeaderComponent={() => HeaderList(item.name)}
    />
  );
};

export const TrackItem = memo(TrackItemComponent, isEqual);

const RenderItem = memo(
  ({
    item,
    index,
    openBottomModal,
    onPlayTrack,
  }: {
    item: TrackDataItemFields;
    index: number;
    openBottomModal: (item: TrackDataItemFields) => void;
    onPlayTrack: (item: TrackDataItemFields) => void;
  }) => {
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
      };
    }, [scaleAble.value]);

    return (
      <AnimatedTouchableOpacity
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onLongPress={() => openBottomModal(item)}
        onPress={() => onPlayTrack(item)}
        activeOpacity={1}
        style={[Layout.rowBetween, stylez]}>
        <View style={[Layout.rowVCenter, styles.container]}>
          <MediumText>{index + 1}</MediumText>

          <View style={[Layout.rowVCenter, styles.wrapInfo]}>
            <AnimatedImage
              source={{ uri: item?.album?.images[0]?.url }}
              containerStyle={styles.image}
            />
            <View style={styles.name}>
              <BoldText numberOfLines={1} textStyle={styles.title}>
                {item?.name}
              </BoldText>
              <MediumText textStyle={styles.follower}>
                {item?.artists[0]?.name}
              </MediumText>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={[Layout.center, styles.rightIcon]}
          onPress={() => openBottomModal(item)}>
          <SimpleLineIcons
            name="options-vertical"
            size={scale(18)}
            color={Colors.unActive}
          />
        </TouchableOpacity>
      </AnimatedTouchableOpacity>
    );
  },
  isEqual,
);
const styles = StyleSheet.create({
  image: {
    width: scale(35),
    height: scale(35),
  },
  wrapInfo: {
    marginLeft: scale(15),
  },
  divider: {
    height: scale(15),
  },
  name: {
    marginLeft: scale(8),
    flex: 1,
  },
  follower: {
    color: Colors.unActive,
    fontSize: fontScale(14),
  },
  title: {
    fontSize: fontScale(16),
  },
  header: {
    fontSize: fontScale(20),
    marginBottom: scale(15),
  },
  container: {
    flex: 1,
  },
  rightIcon: {
    width: scale(24),
    height: scale(24),
    marginLeft: scale(25),
  },
});
