import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import React from 'react';
import { Container } from 'src/components/container';
import { Header } from 'src/components/header';
import { useScreenController } from 'src/common/hooks';
import { fontScale, scale } from 'src/common/scale';
import { SearchBox } from './components';
import { AnimatedList } from 'src/components/list';
import { useAppSelector } from 'src/common/redux';
import Layout from 'src/themes/Layout';
import FastImage from 'react-native-fast-image';
import Divider from 'src/components/divier';
import Colors from 'src/themes/Colors';
import { MediumText } from 'src/components/text';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { kWidth } from 'src/common/constants';
import { TouchableOpacity } from 'react-native';
import routeNames from 'src/navigation/RouteNames';
import { Keyboard } from 'react-native';
import { getBlurhashColor } from 'src/common/method';

interface Props {}

const SearchScreen = (props: Props) => {
  const { translate, navigation } = useScreenController();
  const { searchData } = useAppSelector(state => state.home);

  const onNavigate = async (item: any) => {
    const bgColor = await getBlurhashColor(item?.album?.images[0]?.url);
    const image = item?.album?.images[0]?.url;
    
    navigation.navigate(routeNames.Stacks.PlayerStack, {
      screen: routeNames.PlayerStack.PlayerScreen,
      params: {
        trackUrl: item?.external_urls?.spotify,
        name: item?.name,
        bgColor: bgColor || 'black',
        image,
      },
    });
  };

  return (
    <Container style={styles.container}>
      <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
        <>
          <Header title={translate('home:search')} />
          <SearchBox />
          <AnimatedList
            onScroll={Keyboard.dismiss}
            style={styles.item}
            flatlistRef={null}
            data={searchData?.tracks?.items}
            ItemSeparatorComponent={() => <Divider height={15} />}
            renderFooter={() => {
              return <View style={{ marginBottom: scale(55) }} />;
            }}
            renderItem={({ item }: any) => {
              return (
                <TouchableOpacity
                  style={Layout.rowBetween}
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
                  </View>
                  <SimpleLineIcons
                    name="options-vertical"
                    size={scale(14)}
                    color={Colors.unActive}
                  />
                </TouchableOpacity>
              );
            }}
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
