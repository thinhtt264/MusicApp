import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { useScreenController } from 'src/common/hooks';
import { getTrackFormPlayList } from 'src/common/firebase';
import { BackHeader } from 'src/components/header';
import { RegularText } from 'src/components/text';
import { scale } from 'src/common/scale';
import { FlatList } from 'react-native';
import { HeaderList, TrackCard } from './components';
import { Spacer } from 'src/components/spacer';
import { startPlaylist } from 'src/common/player';
import { ScreenLoader } from 'src/components/loader';
import { useAppSelector } from 'src/common/redux';
import { searchActions } from 'src/store/action-slices';

type Props = {};

const LoveListScreen = (props: Props) => {
  const { translate, route, dispatch } = useScreenController();
  const [listTrack, setListTrack] = useState<any>();
  const [totalItems, setTotalItems] = useState(0);

  const { id: playlistId, name } = route.params?.data;

  const onOpenModal = (item: any, position = 1) => {
    dispatch(searchActions.onSelectTrack({ ...item, position }));
  };

  getTrackFormPlayList(playlistId, ({ data, totalItems }) => {
    setListTrack(data);
    setTotalItems(totalItems);
  });

  const onPlayQueue = () => {
    startPlaylist(listTrack);
  };

  return (
    <View style={styles.container}>
      <BackHeader title={name} />
      <View style={styles.body}>
        <RegularText>
          {totalItems} {translate('library:song').toLowerCase()}
        </RegularText>
        <FlatList
          data={listTrack}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => <HeaderList onPlayQueue={onPlayQueue} />}
          renderItem={({ item }) => (
            <TrackCard
              item={item}
              onOpenModal={(item: any) => onOpenModal(item)}
            />
          )}
          ItemSeparatorComponent={() => <Spacer size={scale(12)} />}
          ListFooterComponent={() => <View style={styles.footer} />}
          ListEmptyComponent={
            <View style={{ marginTop: '40%' }}>
              <ScreenLoader />
            </View>
          }
        />
      </View>
    </View>
  );
};

export default LoveListScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  body: {
    paddingHorizontal: scale(15),
    flex: 1,
    gap: scale(10),
  },
  footer: {
    height: scale(80),
  },
});
