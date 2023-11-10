import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useRef, useState } from 'react';
import { BoldText, RegularText } from 'src/components/text';
import { TrackDataItemFields } from 'src/models/Track';
import { formatSearchData } from 'src/store/action-slices';
import { useAppSelector } from 'src/common/redux';
import Colors from 'src/themes/Colors';
import Layout from 'src/themes/Layout';
import { fontScale, scale } from 'src/common/scale';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { Portal } from 'react-native-portalize';
import { BottomModal } from 'src/components/modal';
import { BottomSheetContent } from 'src/screens/search/components';
import { BottomSheetRef } from 'src/components/modal/type';
import { startAudio } from 'src/common/player';
import TrackPlayer from 'react-native-track-player';

type Props = {
  item: TrackDataItemFields;
};

const TrackCard = ({ item }: Props) => {
  const { currentTrack } = useAppSelector(state => state.player);
  const { trackName, albumImage, artistName } = formatSearchData(item);
  const [visible, setVisible] = useState(false);

  const bottomSheetRef = useRef<BottomSheetRef>(null);

  const onOpenModal = useCallback(() => {
    bottomSheetRef.current?.onOpen(0);
    setVisible(true);
  }, []);

  const onCloseModal = useCallback(() => {
    bottomSheetRef.current?.onClose();
    setVisible(false);
  }, []);

  const onOpenTrack = async () => {
    await startAudio({ info: item, from: 'playlist' });
    await TrackPlayer.setPlayWhenReady(true);
  };

  if (!item) return null;
  return (
    <>
      <View style={[Layout.rowVCenter, styles.container]}>
        <TouchableOpacity
          style={[Layout.rowVCenter, { flex: 1 }]}
          onPress={onOpenTrack}>
          <Image source={{ uri: albumImage }} style={styles.image} />
          <View style={[Layout.colVCenter, styles.wrapInfo]}>
            <BoldText
              numberOfLines={1}
              textStyle={[
                {
                  color:
                    currentTrack.id === item.id
                      ? Colors.green.default
                      : Colors.white.default,
                },
                styles.track,
              ]}>
              {trackName}
            </BoldText>

            <RegularText numberOfLines={1} textStyle={[styles.artist]}>
              {artistName}
            </RegularText>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionIcon} onPress={onOpenModal}>
          <SimpleLineIcons
            name="options-vertical"
            size={scale(16)}
            color={Colors.unActive}
          />
        </TouchableOpacity>
      </View>
      <Portal>
        <BottomModal ref={bottomSheetRef}>
          {visible ? (
            <BottomSheetContent info={item} onCloseModal={onCloseModal} />
          ) : null}
        </BottomModal>
      </Portal>
    </>
  );
};

export default TrackCard;

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  image: {
    width: scale(50),
    height: scale(50),
  },
  track: {
    fontSize: fontScale(16),
  },
  artist: {
    fontSize: fontScale(12),
    color: Colors.white.darker,
  },
  wrapInfo: {
    marginLeft: scale(10),
    flex: 1,
  },
  optionIcon: {},
});
