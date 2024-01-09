import { FlatList, StyleSheet, View } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { Container } from 'src/components/container';
import { useScreenController } from 'src/common/hooks';
import { getArtistAblum } from 'src/store/action-thunk';
import { BackHeader } from 'src/components/header';
import { LoadMoreList } from 'src/components/list';
import { useAppSelector } from 'src/common/redux';
import { ArtistAlbumItem } from './component';
import { scale } from 'src/common/scale';
import { AlbumParams } from 'src/models/Album';

type Props = {};

const AlbumListScreen = (props: Props) => {
  const { dispatch, navigation, route } = useScreenController();
  const { artistAlbum } = useAppSelector(state => state.artist);

  const flatListRef = useRef<FlatList>(null);

  const params = route?.params?.item;

  useEffect(() => {
    onGetData();
  }, []);

  const onGetData = (page = 0) => {
    dispatch(getArtistAblum({ id: params.id, offset: page }));
  };

  const onGoAlbumScreen = (item: AlbumParams) => {
    navigation.push({
      name: 'AlbumScreen',
      params: {
        item,
      },
    });
  };

  return (
    <Container>
      <BackHeader title="Bản phát hành" />

      <LoadMoreList
        flatListRef={flatListRef}
        data={artistAlbum.items}
        onGetData={page => onGetData(page)}
        totalPages={artistAlbum.total}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
        style={styles.item}
        renderItem={({ item }: any) => (
          <ArtistAlbumItem item={item} onGoAlbumScreen={onGoAlbumScreen} />
        )}
        renderHeader={() => <View style={styles.header} />}
      />
    </Container>
  );
};

export default AlbumListScreen;

const styles = StyleSheet.create({
  divider: {
    height: scale(20),
  },
  item: {
    paddingHorizontal: scale(10),
  },
  header: {
    height: scale(15),
  },
});
