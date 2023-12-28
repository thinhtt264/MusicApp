import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { AnimatedList } from 'src/components/list';
import Layout from 'src/themes/Layout';
import {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { useScreenController } from 'src/common/hooks';
import { getAlbumData } from 'src/store/action-thunk';
import { useAppSelector } from 'src/common/redux';

type Props = {};

const AlbumScreen = (props: Props) => {
  const { dispatch, navigation, translate, route } = useScreenController();
  const { albumData } = useAppSelector(state => state.album);

  const albumParams = route?.params?.item;

  const translationY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    translationY.value = event.contentOffset.y;
  });
  console.log(albumData);

  useEffect(() => {
    dispatch(getAlbumData({ id: albumParams.id }));
  }, []);

  return <View style={[Layout.fill]}></View>;
};

export default AlbumScreen;

const styles = StyleSheet.create({});
