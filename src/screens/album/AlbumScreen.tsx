import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { AnimatedList } from 'src/components/list';
import Layout from 'src/themes/Layout';
import {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { useScreenController } from 'src/common/hooks';

type Props = {};

const AlbumScreen = (props: Props) => {
  const { dispatch, navigation, translate } = useScreenController();

  const translationY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    translationY.value = event.contentOffset.y;
  });

  useEffect(() => {
    dispatch()
  }, []);

  return <View style={[Layout.fill]}></View>;
};

export default AlbumScreen;

const styles = StyleSheet.create({});
