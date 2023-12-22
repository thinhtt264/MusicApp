import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { ArtistDataItemFields } from 'src/models/Artist';
import Layout from 'src/themes/Layout';
import { BoldText, MediumText } from 'src/components/text';
import { fontScale, scale } from 'src/common/scale';
import { AnimatedImage } from 'src/components/image';
import Colors from 'src/themes/Colors';

type Props = {
  item: any;
  data: ArtistDataItemFields[];
};

const RenderItem = ({ item }: { item: ArtistDataItemFields }) => {
  return (
    <TouchableOpacity
      style={[Layout.colCenter, styles.container]}
      activeOpacity={0.6}>
      <AnimatedImage
        source={{ uri: item?.images[1]?.url }}
        containerStyle={styles.image}
      />
      <BoldText textStyle={styles.name}>{item?.name}</BoldText>
    </TouchableOpacity>
  );
};
const ArtistRelateItem = ({ item, data }: Props) => {
  const HeaderList = (name: string) => {
    return <BoldText textStyle={styles.header}>{name}</BoldText>;
  };
  return (
    <>
      {data.length > 0 && HeaderList(item.name)}
      <FlatList
        data={data}
        renderItem={({ item }: any) => <RenderItem item={item} />}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
        horizontal
      />
    </>
  );
};

export default ArtistRelateItem;

const styles = StyleSheet.create({
  container: {
    width: scale(120),
  },
  header: {
    fontSize: fontScale(20),
    marginBottom: scale(15),
  },
  image: {
    width: scale(120),
    height: scale(120),
    borderRadius: scale(60),
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
