import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
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

type Props = {};

const PlayListScreen = (props: Props) => {
  const { translate, route } = useScreenController();
  const [listTrack, setListTrack] = useState<any>();
  const [totalItems, setTotalItems] = useState(0);
  const { currentTrack } = useAppSelector(state => state.player);

  const { id: playlistId, name } = route.params?.data;

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
          ListHeaderComponent={() => <HeaderList onPlayQueue={onPlayQueue} />}
          renderItem={({ item }) => <TrackCard item={item} />}
          ItemSeparatorComponent={() => <Spacer size={scale(12)} />}
          style={{ marginBottom: currentTrack ? scale(100) : scale(30) }}
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

export default PlayListScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  body: {
    paddingHorizontal: scale(15),
    flex: 1,
  },
});
