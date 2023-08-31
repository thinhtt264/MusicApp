import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { memo } from 'react';
import isEqual from 'react-fast-compare';
import Layout from 'src/themes/Layout';
import FastImage from 'react-native-fast-image';
import { SearchDataItemFields } from 'src/models/Search';
import { MediumText } from 'src/components/text';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { fontScale, scale } from 'src/common/scale';
import Colors from 'src/themes/Colors';
import { kWidth } from 'src/common/constants';

interface Props {
  onNavigate: (item: SearchDataItemFields) => void;
  item: SearchDataItemFields;
  isRecentList: boolean;
}

const SearchItemComponent = ({ onNavigate, item, isRecentList }: Props) => {
  return (
    <TouchableOpacity
      style={[Layout.rowBetween, styles.container]}
      onPress={() => onNavigate(item)}>
      <View style={[Layout.row]}>
        <FastImage
          source={{ uri: item?.album?.images[0]?.url }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.info}>
          <MediumText numberOfLines={1} textStyle={styles.songname}>
            {item.name}
          </MediumText>
          <MediumText numberOfLines={1} textStyle={styles.artists}>
            {item.artists[0].name}
          </MediumText>
        </View>

        <View style={styles.rightIcon}>
          {isRecentList ? (
            <MaterialIcons
              size={scale(24)}
              color={Colors.unActive}
              name="close"
            />
          ) : (
            <SimpleLineIcons
              name="options-vertical"
              size={scale(15)}
              color={Colors.unActive}
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const SearchItemResult = memo(SearchItemComponent, isEqual);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: scale(55),
    height: scale(55),
  },
  item: {
    marginTop: scale(20),
  },
  artists: {
    color: Colors.unActive,
    fontSize: fontScale(14),
    maxWidth: kWidth - scale(100),
  },
  songname: {
    fontSize: fontScale(16),
    maxWidth: kWidth - scale(100),
  },
  info: {
    flex: 1,
    marginLeft: scale(10),
    justifyContent: 'center',
  },
  rightIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: scale(20),
  },
});
