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

type Props = {};

const PlayListScreen = (props: Props) => {
  const { dispatch, navigation, translate, route } = useScreenController();
  const [listTrack, setListTrack] = useState<any>();
  const { id: playlistId, name, total } = route.params?.data;

  useEffect(() => {
    getTrackFormPlayList(playlistId).then(res => {
      setListTrack(res);
    });
  }, []);

  const onPlayQueue = () => {
    startPlaylist(listTrack);
  };

  return (
    <View style={styles.container}>
      <BackHeader title={name} />
      <View style={styles.body}>
        <RegularText>
          {total} {translate('library:song').toLowerCase()}
        </RegularText>
        <FlatList
          data={listTrack}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={() => <HeaderList onPlayQueue={onPlayQueue} />}
          renderItem={({ item }) => <TrackCard item={item} />}
          ItemSeparatorComponent={() => <Spacer size={scale(12)} />}
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
