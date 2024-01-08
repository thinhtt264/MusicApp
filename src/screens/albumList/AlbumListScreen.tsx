import { StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import { Container } from 'src/components/container';
import { useScreenController } from 'src/common/hooks';
import { getArtistAblum } from 'src/store/action-thunk';
import { BackHeader } from 'src/components/header';
import { LoadMoreList } from 'src/components/list';
import { useAppSelector } from 'src/common/redux';
import { ArtistAlbumItem } from './component';
import { scale } from 'src/common/scale';

type Props = {};

const AlbumListScreen = (props: Props) => {
  const { dispatch, navigation, route } = useScreenController();
  const { artistAlbum } = useAppSelector(state => state.artist);

  const params = route?.params?.item;

  useEffect(() => {
    dispatch(getArtistAblum({ id: params.id }));
  }, []);

  return (
    <Container>
      <BackHeader title="Bản phát hành" />

      <LoadMoreList
        data={artistAlbum.items}
        onGetData={page => getArtistAblum({ id: params.id, offset: page })}
        totalPages={artistAlbum.total}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
        style={styles.item}
        renderItem={({ item }: any) => (
          <ArtistAlbumItem item={item} onGoAlbumScreen={() => {}} />
        )}
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
});
