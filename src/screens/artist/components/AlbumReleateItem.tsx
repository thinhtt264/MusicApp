import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Album, AlbumParams } from 'src/models/Album';
import Layout from 'src/themes/Layout';
import { BoldText } from 'src/components/text';
import { AnimatedImage } from 'src/components/image';
import { fontScale, scale } from 'src/common/scale';
import Colors from 'src/themes/Colors';
import { translate } from 'src/common/language/translate';

type Props = {
  item: any;
  name: string;
  data: Album[];
  onGoAlbumScreen: (item: AlbumParams) => void;
};

const RenderItem = ({
  item,
  onGoAlbumScreen,
}: {
  item: Album;
  onGoAlbumScreen: (item: AlbumParams) => void;
}) => {
  return (
    <TouchableOpacity
      style={[Layout.colCenter, styles.container]}
      onPress={() =>
        onGoAlbumScreen({
          album: '',
          id: item?.id,
          name: item?.name,
        })
      }
      activeOpacity={0.6}>
      <AnimatedImage
        source={{ uri: item?.images[1]?.url }}
        containerStyle={styles.image}
      />
      <BoldText numberOfLines={1} textStyle={styles.name}>
        {item?.name}
      </BoldText>
    </TouchableOpacity>
  );
};
const AlbumReleateItem = ({ data, name, onGoAlbumScreen }: Props) => {
  const HeaderList = (name: string) => {
    return (
      <BoldText textStyle={styles.header}>
        {translate('library:alBumRelated', { artist: name })}
      </BoldText>
    );
  };
  return (
    <>
      {data.length > 0 && HeaderList(name)}
      <FlatList
        data={data}
        renderItem={({ item }: any) => (
          <RenderItem item={item} onGoAlbumScreen={onGoAlbumScreen} />
        )}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
        horizontal
      />
    </>
  );
};

export default AlbumReleateItem;

const styles = StyleSheet.create({
  container: {
    width: scale(120),
    justifyContent: 'flex-start',
  },
  header: {
    fontSize: fontScale(20),
    marginBottom: scale(15),
  },
  image: {
    width: scale(120),
    height: scale(120),
    overflow: 'hidden',
  },
  divider: {
    width: scale(15),
  },
  name: {
    fontSize: fontScale(14),
    color: Colors.white.default,
    marginTop: scale(5),
    textAlign: 'center',
  },
});
