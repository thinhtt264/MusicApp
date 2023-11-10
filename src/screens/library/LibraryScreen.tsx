import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Container } from 'src/components/container';
import { Header } from 'src/components/header';
import { useScreenController } from 'src/common/hooks';
import { fontScale, scale } from 'src/common/scale';
import { RegularText } from 'src/components/text';
import Colors from 'src/themes/Colors';
import { Spacer } from 'src/components/spacer';
import { PlaylistCard } from './components';
import { useAppSelector } from 'src/common/redux';
import { getPlaylist } from 'src/common/firebase';

type Props = {};
const LibraryScreen = (props: Props) => {
  const { translate, navigation, dispatch } = useScreenController();
  const { loveQueue } = useAppSelector(state => state.profile);
  const [list, setList] = useState<any>([]);

  useEffect(() => {
    getPlaylist().then(res => {
      setList(res);
    });
  }, []);

  const onNavigate = (data: any) => {
    navigation.navigate({
      name: 'LibraryStack',
      params: { screen: 'PlaylistScreen', params: { data } },
    });
  };

  return (
    <Container style={styles.container}>
      <Header title={translate('home:library')} />
      <View style={styles.body}>
        <View style={[styles.tag]}>
          <RegularText textStyle={{ fontSize: fontScale(12) }}>
            {translate('library:playlist')}
          </RegularText>
        </View>
        <Spacer size={scale(20)} />
        <FlatList
          data={list}
          renderItem={({ item }: any) => (
            <PlaylistCard onNavigate={data => onNavigate(data)} item={item} />
          )}
        />
      </View>
    </Container>
  );
};

export default LibraryScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(10),
    flex: 1,
  },
  body: {
    paddingTop: scale(15),
  },
  tag: {
    backgroundColor: Colors.grey.body,
    paddingHorizontal: scale(12),
    paddingVertical: scale(7),
    borderRadius: 15,
    alignSelf: 'flex-start',
  },
});
