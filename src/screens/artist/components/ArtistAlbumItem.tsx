import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { Album } from 'src/models/Album';
import Layout from 'src/themes/Layout';
import { fontScale, scale } from 'src/common/scale';
import { BoldText, MediumText } from 'src/components/text';
import { getYear } from 'src/common/helper';
import { translate } from 'src/common/language/translate';
import Colors from 'src/themes/Colors';

type Props = {
  item: any;
  data: Album[];
};

const RenderItem = ({ item }: { item: Album }) => {
  return (
    <TouchableOpacity style={[Layout.rowVCenter]} activeOpacity={0.6}>
      <Image style={styles.image} source={{ uri: item?.images[1].url }} />
      <View style={[Layout.colVCenter, styles.wrapInfo]}>
        <BoldText textStyle={styles.name}>{item?.name}</BoldText>
        <MediumText textStyle={styles.albumType}>{`${getYear(
          item?.release_date,
        )} - ${translate(`album:${item.album_type}`)}`}</MediumText>
      </View>
    </TouchableOpacity>
  );
};

const ArtistAlbumItem = ({ item, data }: Props) => {
  const HeaderList = (name: string) => {
    return <BoldText textStyle={styles.header}>{name}</BoldText>;
  };

  const FooterList = () => {
    return (
      <TouchableOpacity
        style={[Layout.fill, Layout.center, styles.footer]}
        activeOpacity={0.6}>
        <BoldText textStyle={styles.footerLabel}>
          {translate('album:showAllAlbum')}
        </BoldText>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={({ item }: any) => <RenderItem item={item} />}
      keyExtractor={(item, index) => index.toString()}
      ItemSeparatorComponent={() => <View style={styles.divider} />}
      ListHeaderComponent={() => HeaderList(item.name)}
      ListFooterComponent={FooterList}
    />
  );
};

export default ArtistAlbumItem;

const styles = StyleSheet.create({
  image: {
    width: scale(80),
    height: scale(80),
  },
  divider: {
    height: scale(15),
  },
  header: {
    fontSize: fontScale(20),
    marginBottom: scale(15),
  },
  albumType: {
    color: Colors.unActive,
    fontSize: fontScale(14),
  },
  name: {
    fontSize: fontScale(16),
  },
  wrapInfo: {
    gap: scale(2),
    marginLeft: scale(8),
  },
  footer: {
    borderWidth: 0.5,
    borderColor: Colors.unActive,
    borderRadius: scale(10),
    marginHorizontal: '18%',
    marginTop: scale(15),
  },
  footerLabel: {
    textAlign: 'center',
    paddingVertical: scale(2),
  },
});
