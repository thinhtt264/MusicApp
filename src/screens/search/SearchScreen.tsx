import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Container } from 'src/components/container';
import { Header } from 'src/components/header';
import { useScreenController } from 'src/common/hooks';
import { scale } from 'src/common/scale';
import { SearchBox } from './components';
import { AnimatedList } from 'src/components/list';
import { useAppSelector } from 'src/common/redux';
import Layout from 'src/themes/Layout';
import FastImage from 'react-native-fast-image';
import Divider from 'src/components/divier';

interface Props { }

const SearchScreen = (props: Props) => {
  const { dispatch, navigation, translate } = useScreenController();
  const { searchData } = useAppSelector(state => state.home);

  return (
    <Container style={styles.container}>
      <Header title={translate('home:search')} />
      <SearchBox />
      <AnimatedList
        style={styles.item}
        flatlistRef={null}
        data={searchData?.tracks?.items}
        ItemSeparatorComponent={() => <Divider height={15} />}
        renderFooter={() => {
          return (<View style={{ marginBottom: scale(55) }} />)
        }}
        renderItem={({ item }: any) => {
          return (
            <View style={[Layout.row]}>
              <FastImage
                source={{ uri: item?.album?.images[0]?.url }}
                style={styles.image}
                resizeMode='cover'
              />
            </View>
          )
        }}
      />
    </Container>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(10),
  },
  image: {
    width: scale(50),
    height: scale(50),
  },
  item: {
    marginTop: scale(20),
  }
});
