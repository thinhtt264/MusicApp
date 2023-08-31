import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, { useState, useCallback } from 'react';
import { Container } from 'src/components/container';
import { Header } from 'src/components/header';
import { useScreenController } from 'src/common/hooks';
import { fontScale, scale } from 'src/common/scale';
import { SearchBox } from './components';
import { AnimatedList } from 'src/components/list';
import { useAppSelector } from 'src/common/redux';
import Divider from 'src/components/divier';
import Colors from 'src/themes/Colors';
import { BoldText } from 'src/components/text';
import { kWidth } from 'src/common/constants';
import routeNames from 'src/navigation/RouteNames';
import { getBackGroundPlayer, getBlurhashColor } from 'src/common/helper';
import { SearchItemResult } from './components/SearchItemResult';

interface Props {}

const SearchScreen = (props: Props) => {
  const { translate, navigation } = useScreenController();
  const { searchData, searchRecentData } = useAppSelector(state => state.home);

  const [searchValue, setSearchValue] = useState('');

  const onNavigate = async (item: any) => {
    const bgColor = await getBackGroundPlayer(item?.album?.images[0]?.url);
    const blurHashColor =
      bgColor !== 'rgb(72,72,72)'
        ? await getBlurhashColor(item?.album?.images[0]?.url)
        : false;

    navigation.navigate(routeNames.Stacks.PlayerStack, {
      screen: routeNames.PlayerStack.PlayerScreen,
      params: { item, bgColor: blurHashColor || bgColor || 'black' },
    });
  };

  const renderItem = useCallback((item: any) => {
    return (
      <SearchItemResult
        onNavigate={onNavigate}
        item={item}
        isRecentList={!searchValue}
      />
    );
  }, []);

  return (
    <Container style={styles.container}>
      <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
        <>
          <Header title={translate('home:search')} />
          <SearchBox onSearchChange={value => setSearchValue(value)} />
          {!searchValue && (
            <View style={{ marginTop: scale(20) }}>
              <BoldText textStyle={{ fontSize: fontScale(18) }}>
                {translate('search:recent')}
              </BoldText>
            </View>
          )}
          <AnimatedList
            onScroll={Keyboard.dismiss}
            style={styles.item}
            flatlistRef={null}
            data={
              searchValue
                ? searchData?.tracks?.items
                : searchRecentData?.tracks?.items
            }
            ItemSeparatorComponent={() => <Divider height={15} />}
            renderFooter={() => {
              return <View style={{ marginBottom: scale(55) }} />;
            }}
            renderItem={({ item }: any) => renderItem(item)}
          />
        </>
      </TouchableWithoutFeedback>
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
