import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import isEqual from 'react-fast-compare';
import { Portal } from 'react-native-portalize';
import { dispatch, useAppSelector } from 'src/common/redux';
import BottomModal from './BottomModal';
import { BottomSheetRef } from './type';
import {
  BottomSheetContent,
  SelectArtist,
} from 'src/screens/search/components';
import { navigation } from 'src/common/navigation';
import { searchActions } from 'src/store/action-slices';
import { SafeAreaView } from 'react-native-safe-area-context';

const SelectTrackModalComponent = () => {
  //   const { currentTrack } = useAppSelector(state => state.player);
  const { selectedTrack } = useAppSelector(state => state.search);

  const [visible, setVisible] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState([]);

  const trackModalRef = useRef<BottomSheetRef>(null);

  const onCloseModal = useCallback(() => {
    dispatch(searchActions.onDeleteSelectTrack());
    setVisible(false);
    setSelectedArtist([]);
    trackModalRef?.current?.onClose();
  }, []);

  const openBottomModal = useCallback((position = 1) => {
    trackModalRef.current?.onOpen(position);
    setVisible(true);
  }, []);

  const onNavigate = useCallback(async (item: any) => {
    navigation.push({
      name: 'ArtistScreen',
      params: {
        item: item,
      },
    });
  }, []);

  const selectArtist = useCallback((item: any) => {
    setSelectedArtist(item);
    trackModalRef.current?.onClose();
    setTimeout(() => {
      trackModalRef.current?.onOpen(0);
    }, 200);
  }, []);

  useEffect(() => {
    if (!selectedTrack?.id) return;
    openBottomModal(selectedTrack.position);
  }, [selectedTrack?.id]);

  return (
    <Portal>
      <BottomModal onCloseModal={onCloseModal} ref={trackModalRef}>
        <SafeAreaView>
          {visible ? (
            selectedArtist.length > 0 ? (
              <SelectArtist
                data={selectedArtist}
                onPressItem={(item: any) => {
                  onCloseModal();
                  onNavigate(item);
                }}
              />
            ) : (
              <BottomSheetContent
                info={selectedTrack as any}
                onCloseModal={onCloseModal}
                selectArtist={(item: any) => selectArtist(item)}
              />
            )
          ) : null}
        </SafeAreaView>
      </BottomModal>
    </Portal>
  );
};

export const SelectTrackModal = memo(SelectTrackModalComponent, isEqual);
