import {
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import React, { useLayoutEffect, useRef } from 'react';
import Layout from 'src/themes/Layout';
import { AnimatedList } from 'src/components/list';
import {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { Banner } from 'src/components/header';
import { useScreenController } from 'src/common/hooks';
import { ArtistDataItemFields } from 'src/models/Artist';
import { BoldText } from 'src/components/text';
import { fontScale, scale } from 'src/common/scale';
import { isIos } from 'src/common/device';
import Colors from 'src/themes/Colors';

type Props = {};

const ArtistScreen = (props: Props) => {
  const { route } = useScreenController();
  const item = route?.params?.item as ArtistDataItemFields;

  const scrollRef = useRef<FlatList>(null);

  const translationY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    translationY.value = event.contentOffset.y;
  });

  useLayoutEffect(() => {
    if (!isIos) {
      StatusBar.setTranslucent(true);
      StatusBar.setBackgroundColor('transparent');
    }
    return () => {};
  }, []);
  const data = [
    {
      item: 'item 1',
      id: 1,
    },
    {
      item: 'item 2',
      id: 2,
    },
    {
      item: 'item 3',
      id: 4,
    },
    {
      item: 'item 3',
      id: 3,
    },
    {
      item: 'item 3',
      id: 3,
    },
    {
      item: 'item 3',
      id: 3,
    },
    {
      item: 'item 3',
      id: 3,
    },
    {
      item: 'item 3',
      id: 3,
    },
    {
      item: 'item 3',
      id: 3,
    },
    {
      item: 'item 3',
      id: 3,
    },
    {
      item: 'item 3',
      id: 3,
    },
    {
      item: 'item 3',
      id: 3,
    },
    {
      item: 'item 3',
      id: 3,
    },
    {
      item: 'item 3',
      id: 3,
    },
    {
      item: 'item 3',
      id: 3,
    },
    {
      item: 'item 3',
      id: 3,
    },
    {
      item: 'item 3',
      id: 3,
    },
    {
      item: 'item 3',
      id: 3,
    },
    {
      item: 'item 3',
      id: 3,
    },
    {
      item: 'item 3',
      id: 3,
    },
    {
      item: 'item 3',
      id: 3,
    },
    {
      item: 'item 3',
      id: 3,
    },
    {
      item: 'item 3',
      id: 3,
    },
    {
      item: 'item 3',
      id: 3,
    },
  ];

  return (
    <View style={[Layout.fill]}>
      <Banner
        img={item.images[0].url}
        name={item.name}
        translationY={translationY}
      />

      <AnimatedList
        bounces={false}
        keyExtractor={(_, index) => index.toString()}
        data={data}
        onScroll={scrollHandler}
        style={{}}
        contentContainerStyle={{
          marginTop: scale(265),
          backgroundColor: Colors.black.default,
        }}
        scrollEventThrottle={16}
        renderItem={({ item }: any) => (
          <View
            style={{
              height: scale(100),
            }}>
            <BoldText>{item.item}</BoldText>
          </View>
        )}
      />
    </View>
  );
};

export default ArtistScreen;

const styles = StyleSheet.create({});
