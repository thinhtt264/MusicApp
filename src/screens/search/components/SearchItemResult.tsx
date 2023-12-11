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
import { dispatch, useAppSelector } from 'src/common/redux';
import { searchActions } from 'src/store/action-slices';
import { ArtistDataItemFields } from 'src/models/Artist';
import { translate } from 'src/common/language/translate';
import { formatNumber } from '../../../common/helper/math/index';

interface Props {
  onNavigate: (item: any) => void;
  item: any;
  isRecentList: boolean;
  selectedFilter: string;
  openBottomModal: (item: TrackDataItemFields) => void;
}

const SearchItemComponent = ({
  onNavigate,
  item,
  isRecentList,
  openBottomModal,
  selectedFilter,
}: Props) => {
  const { currentTrack } = useAppSelector(state => state.player);

  const TrackItem = (props: {
    item: TrackDataItemFields;
    onNavigate: (item: TrackDataItemFields) => void;
  }) => {
    return (
      <TouchableOpacity
        style={[
          Layout.row,
          {
            flex: 1,
          },
        ]}
        onPress={() => props.onNavigate(props.item)}>
        <FastImage
          source={{
            uri: props.item?.album?.images[0]?.url,
          }}
          style={styles.trackImage}
          resizeMode="cover"
        />
        <View style={styles.info}>
          <MediumText
            numberOfLines={1}
            textStyle={[
              styles.songname,
              {
                color:
                  currentTrack?.id === props.item.id
                    ? Colors.green.default
                    : 'white',
              },
            ]}>
            {props.item.name}
          </MediumText>
          <MediumText numberOfLines={1} textStyle={styles.artists}>
            {props.item.artists[0].name}
          </MediumText>
        </View>
      </TouchableOpacity>
    );
  };

  const ArtistItem = (props: {
    item: ArtistDataItemFields;
    onNavigate: (item: ArtistDataItemFields) => void;
  }) => {
    return (
      <TouchableOpacity
        style={[
          Layout.row,
          {
            flex: 1,
          },
        ]}
        onPress={() => props.onNavigate(props.item)}>
        <FastImage
          source={{
            uri: props.item?.images?.[0]?.url,
            priority: FastImage.priority.normal,
          }}
          style={styles.artistImage}
          resizeMode="cover"
        />
        <View style={styles.info}>
          <MediumText numberOfLines={1} textStyle={[styles.songname]}>
            {props.item.name}
          </MediumText>
          <MediumText numberOfLines={1} textStyle={styles.artists}>
            {formatNumber(props.item.followers.total)} -{' '}
            {translate('search:folower')}
          </MediumText>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View style={[Layout.rowBetween, styles.container]}>
        {selectedFilter === 'track' ? (
          <TrackItem onNavigate={onNavigate} item={item} />
        ) : (
          <ArtistItem onNavigate={onNavigate} item={item} />
        )}

        {isRecentList ? (
          <TouchableOpacity
            style={styles.rightIcon}
            onPress={() => {
              dispatch(
                searchActions.removeSearchRecentList(
                  isRecentList ? item.id : '',
                ),
              );
            }}>
            <MaterialIcons
              size={scale(24)}
              color={Colors.unActive}
              name="close"
            />
          </TouchableOpacity>
        ) : selectedFilter === 'track' ? (
          <TouchableOpacity
            style={styles.rightIcon}
            onPress={() => openBottomModal(item)}>
            <SimpleLineIcons
              name="options-vertical"
              size={scale(16)}
              color={Colors.unActive}
            />
          </TouchableOpacity>
        ) : null}
      </View>
    </>
  );
};

export const SearchItemResult = memo(SearchItemComponent, isEqual);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  artistImage: {
    width: scale(50),
    height: scale(50),
    borderRadius: scale(50) / 2,
  },
  trackImage: {
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
    gap: scale(5),
  },
  rightIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: scale(30),
  },
});
