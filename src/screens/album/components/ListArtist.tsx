import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { fontScale, scale } from 'src/common/scale';
import Layout from 'src/themes/Layout';
import FastImage from 'react-native-fast-image';
import { ArtistDataItemFields } from 'src/models/Artist';
import { BoldText, SemiBoldText } from 'src/components/text';
import { formatFullDate } from 'src/common/helper';

type Props = {
  artists: ArtistDataItemFields[];
  release_date: string;
  onGoArtistScreen: (artist: ArtistDataItemFields) => void;
};

const ListArtist = ({ artists, release_date, onGoArtistScreen }: Props) => {
  const HeaderList = (date: string) => {
    return (
      <View style={styles.header}>
        <BoldText textStyle={styles.date}>{formatFullDate(date)}</BoldText>
      </View>
    );
  };

  return (
    <FlatList
      renderItem={({ item }) => (
        <RenderItem item={item} onGoArtistScreen={onGoArtistScreen} />
      )}
      data={artists}
      keyExtractor={(item, index) => index.toString()}
      ItemSeparatorComponent={() => <View style={styles.divider} />}
      ListHeaderComponent={() => HeaderList(release_date)}
    />
  );
};

export default ListArtist;

const RenderItem = ({
  item,
  onGoArtistScreen,
}: {
  item: ArtistDataItemFields;
  onGoArtistScreen: (artist: ArtistDataItemFields) => void;
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => onGoArtistScreen(item)}
      style={[Layout.rowVCenter, styles.item]}>
      <FastImage
        style={styles.img}
        source={{ uri: item?.images[2]?.url }}
        resizeMode="cover"
      />
      <SemiBoldText>{item?.name}</SemiBoldText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: scale(15),
  },
  divider: {
    height: scale(10),
  },
  img: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
  },
  item: {
    gap: scale(10),
  },
  date: {
    fontSize: fontScale(16),
  },
});
