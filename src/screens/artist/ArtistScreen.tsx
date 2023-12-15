import { FlatList, StatusBar, StyleSheet, View } from 'react-native';
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
import { HeaderList } from './components';

type Props = {};

const ArtistScreen = (props: Props) => {
  const { route } = useScreenController();
  const item = route?.params?.item as ArtistDataItemFields;
  const { blurHashColor, bgColor } = route?.params as any;

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
        blurHashColor={blurHashColor}
        bgColor={bgColor}
        img={item?.images[0]?.url}
        name={item.name}
        translationY={translationY}
      />

      <AnimatedList
        bounces={false}
        overScrollMode="never"
        keyExtractor={(_, index) => index.toString()}
        data={data}
        onScroll={scrollHandler}
        contentContainerStyle={{
          backgroundColor: Colors.black.default,
          marginTop: scale(260),
        }}
        scrollEventThrottle={16}
        ListHeaderComponent={() => (
          <HeaderList
            follower={item.followers.total}
            onPlayQueue={() => {}}
            bgColor={bgColor}
          />
        )}
        renderItem={({ item, index }: any) => {
          return (
            <View
              style={{
                height: scale(100),
                paddingHorizontal: scale(10),
              }}>
              <BoldText>{item.item}</BoldText>
            </View>
          );
        }}
      />
    </View>
  );
};

export default ArtistScreen;

const styles = StyleSheet.create({});
