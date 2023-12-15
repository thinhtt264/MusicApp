import { FlatList, StyleSheet, View } from 'react-native';
import React, {
  useRef,
  useCallback,
  useState,
  useEffect,
  useMemo,
} from 'react';
import { Container } from 'src/components/container';
import { Header } from 'src/components/header';
import { useScreenController } from 'src/common/hooks';
import { fontScale, scale } from 'src/common/scale';
import { BottomSheetContent, SearchBox, TagFilter } from './components';
import { useAppSelector } from 'src/common/redux';
import Divider from 'src/components/divier';
import Colors from 'src/themes/Colors';
import { BoldText } from 'src/components/text';
import { kWidth } from 'src/common/constants';
import { SearchItemResult } from './components/SearchItemResult';
import LoadMoreList from 'src/components/list/LoadMoreList';
import { getSearchData } from 'src/store/action-thunk';
import { AnimatedList } from 'src/components/list';
import { startAudio } from 'src/common/player';
import TrackPlayer from 'react-native-track-player';
import { Portal } from 'react-native-portalize';
import { BottomModal } from 'src/components/modal';
import { BottomSheetRef } from 'src/components/modal/type';
import { useFocusEffect } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { searchActions } from 'src/store/action-slices';
import { getBackGroundPlayer, getBlurhashColor } from 'src/common/helper';

interface Props {}

const SearchScreen = (props: Props) => {
  const { translate, dispatch, navigation } = useScreenController();
  const { searchData, searchRecentData, selectedFilter } = useAppSelector(
    state => state.search,
  );
  const { currentTrack } = useAppSelector(state => state.player);
  const [visible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const flatListRef = useRef<FlatList>(null);
  const bottomSheetRef = useRef<BottomSheetRef>(null);

  const onCloseModal = useCallback(() => {
    setVisible(false);
    bottomSheetRef.current?.onClose();
  }, []);

  const openBottomModal = useCallback((item: any) => {
    bottomSheetRef.current?.onOpen(0);
    setSelectedItem(item);
    setVisible(true);
  }, []);

  const onNavigate = useCallback(async (item: any, type: string) => {
    if (type === 'track') {
      await startAudio({ info: item, from: 'search' });
      await TrackPlayer.setPlayWhenReady(true);
    } else {
      const bgColor = await getBackGroundPlayer(item.images[0].url);
      const blurHashColor =
        bgColor !== Colors.grey.player
          ? await getBlurhashColor(item.images[0].url)
          : false;

      navigation.navigate({
        name: 'ArtistScreen',
        params: {
          item: item,
          bgColor: bgColor,
          blurHashColor: blurHashColor,
        },
      });
      dispatch(searchActions.addSearchRecentList({ ...item, type }));
    }
  }, []);

  const renderItem = useCallback(
    ({
      item,
      isRecentList = false,
      selectedFilter = 'track',
      currentTrack,
    }: any) => {
      return (
        <SearchItemResult
          currentTrack={currentTrack}
          selectedFilter={selectedFilter}
          onNavigate={onNavigate}
          item={item}
          isRecentList={isRecentList}
          openBottomModal={item => openBottomModal(item)}
        />
      );
    },
    [],
  );

  const onGetData = useCallback(
    async ({ query = '', pageNumber = 0, type = 'track' }) => {
      await dispatch(
        getSearchData({
          keyword: query || searchData.keyword,
          type: type,
          offset: pageNumber,
        }),
      );
    },
    [searchData.keyword],
  );

  const onFilterChange = useCallback(
    (type: string) => {
      onGetData({
        query: searchData.keyword,
        pageNumber: 0,
        type: type,
      });
    },
    [searchData.keyword],
  );

  useEffect(() => {
    if (!searchData.keyword) return;
    onFilterChange(selectedFilter);
  }, [selectedFilter]);

  useEffect(() => {}, [visible]);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        FastImage.clearDiskCache();
        FastImage.clearMemoryCache();
      };
    }, []),
  );

  return (
    <Container style={styles.container}>
      <>
        <Header title={translate('home:search')} />
        <SearchBox
          onGetData={value => onGetData({ query: value, type: selectedFilter })}
        />

        {searchData.keyword ? (
          <>
            <View style={{ marginTop: scale(10) }}>
              <TagFilter selectedFilter={selectedFilter} />
            </View>
            {selectedFilter === 'track' ? (
              <LoadMoreList
                key={`loadMoreList_track`}
                onGetData={page =>
                  onGetData({ pageNumber: page, type: selectedFilter })
                }
                totalPages={searchData?.tracks?.total}
                style={styles.item}
                flatListRef={flatListRef}
                data={searchData?.tracks?.items ?? []}
                ItemSeparatorComponent={() => <Divider height={15} />}
                renderItem={({ item }: any) =>
                  renderItem({
                    item: item,
                    selectedFilter: selectedFilter,
                    currentTrack: currentTrack,
                  })
                }
              />
            ) : (
              <LoadMoreList
                key={`loadMoreList_artist`}
                onGetData={page =>
                  onGetData({ pageNumber: page, type: selectedFilter })
                }
                flatListRef={flatListRef}
                totalPages={searchData?.artists?.total}
                style={styles.item}
                data={searchData?.artists?.items ?? []}
                ItemSeparatorComponent={() => <Divider height={20} />}
                renderItem={({ item }: any) =>
                  renderItem({
                    item: item,
                    selectedFilter: selectedFilter,
                    currentTrack: currentTrack,
                  })
                }
              />
            )}
          </>
        ) : (
          <>
            <View style={{ marginTop: scale(20) }}>
              <BoldText textStyle={{ fontSize: fontScale(18) }}>
                {translate('search:recent')}
              </BoldText>
            </View>

            <AnimatedList
              style={[
                styles.item,
                { marginBottom: currentTrack ? scale(60) : 0 },
              ]}
              flatListRef={flatListRef}
              data={searchRecentData?.lists?.items ?? []}
              ItemSeparatorComponent={() => <Divider height={15} />}
              renderFooter={() => {
                return <View style={{ marginBottom: scale(55) }} />;
              }}
              renderItem={({ item }: any) =>
                renderItem({
                  item: item,
                  isRecentList: true,
                  currentTrack: currentTrack,
                })
              }
            />
          </>
        )}
        <Portal>
          <BottomModal onCloseModal={onCloseModal} ref={bottomSheetRef}>
            {visible ? (
              <BottomSheetContent
                info={selectedItem as any}
                onCloseModal={onCloseModal}
              />
            ) : null}
          </BottomModal>
        </Portal>
      </>
    </Container>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(10),
    flex: 1,
  },
  image: {
    width: scale(45),
    height: scale(45),
  },
  item: {
    marginTop: scale(15),
  },
  artists: {
    color: Colors.unActive,
    fontSize: fontScale(12),
    maxWidth: kWidth - scale(100),
  },
  songname: {
    fontSize: fontScale(14),
    maxWidth: kWidth - scale(100),
  },
  info: {
    marginLeft: scale(10),
    justifyContent: 'center',
  },
});
