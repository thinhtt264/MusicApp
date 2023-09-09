import { StyleSheet, View } from 'react-native';
import React, { useRef, useCallback } from 'react';
import { Container } from 'src/components/container';
import { Header } from 'src/components/header';
import { useScreenController } from 'src/common/hooks';
import { fontScale, scale } from 'src/common/scale';
import { SearchBox } from './components';
import { useAppSelector } from 'src/common/redux';
import Divider from 'src/components/divier';
import Colors from 'src/themes/Colors';
import { BoldText } from 'src/components/text';
import { kWidth } from 'src/common/constants';
import routeNames from 'src/navigation/RouteNames';
import { SearchItemResult } from './components/SearchItemResult';
import LoadMoreList from 'src/components/list/LoadMoreList';
import { getSearchData } from 'src/store/action-thunk';
import { AnimatedList } from 'src/components/list';
import { startAudio } from 'src/common/player';

interface Props {}

const SearchScreen = (props: Props) => {
  const { translate, navigation, dispatch } = useScreenController();
  const { searchData, searchRecentData } = useAppSelector(
    state => state.search,
  );

  const flatListRef = useRef<any>(null);

  const onNavigate = async (item: any) => {
    await startAudio({ info: item, from: 'search' });
    navigation.navigate(routeNames.Stacks.PlayerStack, {
      screen: routeNames.PlayerStack.PlayerScreen,
      params: {
        from: 'search',
      },
    });
  };

  const renderItem = useCallback(
    ({ item, isRecentList = false }: { item: any; isRecentList?: boolean }) => {
      return (
        <SearchItemResult
          onNavigate={onNavigate}
          item={item}
          isRecentList={isRecentList}
        />
      );
    },
    [],
  );

  const onGetData = useCallback(
    async ({ query = '', pageNumber = 0 }) => {
      await dispatch(
        getSearchData({
          keyword: query || searchData.keyword,
          type: 'track',
          offset: pageNumber,
        }),
      );
    },
    [searchData.keyword],
  );

  return (
    <Container style={styles.container}>
      <>
        <Header title={translate('home:search')} />
        <SearchBox onGetData={value => onGetData({ query: value })} />

        {searchData.keyword ? (
          <LoadMoreList
            onGetData={page => onGetData({ pageNumber: page })}
            totalPages={searchData.tracks.total}
            style={styles.item}
            flatlistRef={flatListRef}
            data={searchData?.tracks?.items ?? []}
            ItemSeparatorComponent={() => <Divider height={15} />}
            renderItem={({ item }: any) => renderItem({ item: item })}
          />
        ) : (
          <>
            <View style={{ marginTop: scale(20) }}>
              <BoldText textStyle={{ fontSize: fontScale(18) }}>
                {translate('search:recent')}
              </BoldText>
            </View>

            <AnimatedList
              style={styles.item}
              data={searchRecentData?.tracks?.items ?? []}
              ItemSeparatorComponent={() => <Divider height={15} />}
              renderFooter={() => {
                return <View style={{ marginBottom: scale(55) }} />;
              }}
              renderItem={({ item }: any) =>
                renderItem({ item: item, isRecentList: true })
              }
            />
          </>
        )}
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
    marginTop: scale(20),
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
