import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { memo } from 'react';
import isEqual from 'react-fast-compare';
import Layout from 'src/themes/Layout';
import { Album, AlbumParams } from 'src/models/Album';
import { BoldText, MediumText } from 'src/components/text';
import { AnimatedImage } from 'src/components/image';
import { translate } from 'src/common/language/translate';
import { getYear } from 'src/common/helper';
import { fontScale, scale } from 'src/common/scale';
import Colors from 'src/themes/Colors';

type Props = {
  onGoAlbumScreen: (item: AlbumParams) => void;
  item: Album;
};

const ArtistAlbumItemComponent = ({ item, onGoAlbumScreen }: Props) => {
  return (
    <TouchableOpacity
      style={[Layout.rowVCenter]}
      activeOpacity={0.6}
      onPress={() =>
        onGoAlbumScreen({
          album: '',
          id: item?.id,
          name: item?.name,
        })
      }>
      <AnimatedImage
        containerStyle={styles.image}
        source={{ uri: item?.images[1].url }}
      />
      <View style={[Layout.colVCenter, styles.wrapInfo]}>
        <BoldText numberOfLines={1} textStyle={styles.name}>
          {item?.name}
        </BoldText>
        <MediumText textStyle={styles.albumType}>{`${getYear(
          item?.release_date,
        )} - ${translate(`album:${item.album_type}`)}`}</MediumText>
      </View>
    </TouchableOpacity>
  );
};

export const ArtistAlbumItem = memo(ArtistAlbumItemComponent, isEqual);

const styles = StyleSheet.create({
  image: {
    width: scale(80),
    height: scale(80),
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
    overflow: 'hidden',
    flex: 1,
  },
});
