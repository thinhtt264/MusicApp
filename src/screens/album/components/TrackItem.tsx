import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { memo, useCallback } from 'react';
import Layout from 'src/themes/Layout';
import { BoldText, MediumText } from 'src/components/text';
import { fontScale, scale } from 'src/common/scale';
import { Artist, TrackDataFields, TrackDataItemFields } from 'src/models/Track';
import Colors from 'src/themes/Colors';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import isEqual from 'react-fast-compare';

type Props = {
  item: any;
  tracks: TrackDataFields[];
  openBottomModal: (item: TrackDataItemFields) => void;
  onPlayTrack: (item: TrackDataFields) => void;
};
const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const TopTrackComponent = ({
  tracks,
  item,
  openBottomModal,
  onPlayTrack,
}: Props) => {
  const HeaderList = (name: string) => {
    return <View style={styles.header} />;
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

export const TrackItem = memo(TopTrackComponent, isEqual);

const RenderItem = ({
  item,
  index,
  openBottomModal,
  onPlayTrack,
}: {
  item: TrackDataItemFields;
  index: number;
  openBottomModal: (item: TrackDataItemFields) => void;
  onPlayTrack: (item: TrackDataFields) => void;
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

  const artistSperator = useCallback((artists: Artist[]) => {
    return artists.map(artist => artist.name).join(', ');
  }, []);

  return (
    <AnimatedTouchableOpacity
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={() => onPlayTrack(item)}
      onLongPress={() => openBottomModal(item)}
      activeOpacity={1}
      style={[Layout.rowBetween, stylez]}>
      <View style={[Layout.rowVCenter, styles.container]}>
        <MediumText>{index + 1}</MediumText>

        <View style={[Layout.rowVCenter, styles.wrapInfo]}>
          <View style={styles.name}>
            <BoldText numberOfLines={1} textStyle={styles.title}>
              {item?.name}
            </BoldText>
            <MediumText textStyle={styles.follower}>
              {artistSperator(item?.artists)}
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
};

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
    marginBottom: scale(15),
    marginTop: scale(10),
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
