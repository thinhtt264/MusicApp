import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Container } from 'src/components/container';
import { Header } from 'src/components/header';
import { useScreenController } from 'src/common/hooks';
import { scale } from 'src/common/scale';
import { SearchBox } from './components';

interface Props {}

const SearchScreen = (props: Props) => {
  const { dispatch, navigation, translate } = useScreenController();

  return (
    <Container style={styles.container}>
      <Header title={translate('home:search')} />
      <SearchBox />
    </Container>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(10),
  },
});
