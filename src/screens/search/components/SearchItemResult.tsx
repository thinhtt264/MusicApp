import { StyleSheet, View, TouchableOpacity } from 'react-native';
import React, { memo } from 'react';
import isEqual from 'react-fast-compare';
import Layout from 'src/themes/Layout';
import FastImage from 'react-native-fast-image';
import { MediumText } from 'src/components/text';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TrackDataItemFields } from 'src/models/Track';
import { fontScale, scale } from 'src/common/scale';
import Colors from 'src/themes/Colors';
import { kWidth } from 'src/common/constants';
import { dispatch } from 'src/common/redux';
import { searchActions } from 'src/store/action-slices';

interface Props {
  onNavigate: (item: TrackDataItemFields) => void;
  item: TrackDataItemFields;
  isRecentList: boolean;
}

const SearchItemComponent = ({ onNavigate, item, isRecentList }: Props) => {
  return (
    <View style={[Layout.rowBetween, styles.container]}>
      <TouchableOpacity
        style={[Layout.row, { flex: 1 }]}
        onPress={() => onNavigate(item)}>
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
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.rightIcon}
        onPress={() => {
          dispatch(
            searchActions.removeSearchRecentList(isRecentList ? item.id : ''),
          );
        }}>
        {isRecentList ? (
          <MaterialIcons
            size={scale(24)}
            color={Colors.unActive}
            name="close"
          />
        ) : (
          <SimpleLineIcons
            name="options-vertical"
            size={scale(16)}
            color={Colors.unActive}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export const SearchItemResult = memo(SearchItemComponent, isEqual);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
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
    marginLeft: scale(10),
    justifyContent: 'center',
    flex: 1,
  },
  rightIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: scale(30),
  },
});
