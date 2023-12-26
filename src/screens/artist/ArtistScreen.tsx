import { StatusBar, StyleSheet, View } from 'react-native';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import Layout from 'src/themes/Layout';
import { AnimatedList } from 'src/components/list';
import {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { Banner } from 'src/components/header';
import { useScreenController } from 'src/common/hooks';
import { ArtistDataItemFields } from 'src/models/Artist';
import { scale } from 'src/common/scale';
import { isIos } from 'src/common/device';
import Colors from 'src/themes/Colors';
import {
  AlbumReleateItem,
  ArtistAlbumItem,
  ArtistRelateItem,
  CategoryList,
  FloatingButton,
  HeaderList,
  TopTrackItem,
} from './components';
import { getArtistData, getArtistInfo } from 'src/store/action-thunk';
import { useAppSelector } from 'src/common/redux';
import { ScreenLoader } from 'src/components/loader';
import { getBackGroundPlayer, getBlurhashColor } from 'src/common/helper';
import { startPlaylist } from 'src/common/player';

type Props = {};

const ArtistScreen = (props: Props) => {
  const { route, dispatch } = useScreenController();
  const { artistData } = useAppSelector(state => state.artist);
  const [isLoading, setLoading] = useState(true);
  const [blurHashColor, setBlurHashColor] = useState('');
  const [bgColor, setBgColor] = useState('');

  const artistParams = route?.params?.item as ArtistDataItemFields;

  const [artistInfo, setArtistInfo] = useState(artistParams);

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

  useEffect(() => {
    Promise.all([getData(), getContainerColor()]).finally(() => {
      setLoading(false);
    });
  }, []);

  const getData = () => {
    if (artistData.id === artistParams.id) return;
    dispatch(getArtistData({ id: artistParams.id, limit: 4 }));
  };

  const getContainerColor = useCallback(async () => {
    let imgUrl = '';

    if (artistParams && artistParams.images && artistParams.images.length > 0) {
      imgUrl = artistParams.images[0].url;
    } else {
      const response = await dispatch(getArtistInfo({ id: artistParams.id }));
      imgUrl = await response?.payload?.images[0]?.url;
      setArtistInfo(response?.payload);
    }

    const bgColor = await getBackGroundPlayer(imgUrl);
    const blurHashColor =
      bgColor !== Colors.grey.player ? await getBlurhashColor(imgUrl) : false;
    setBgColor(bgColor ?? '');
    setBlurHashColor(blurHashColor !== false ? blurHashColor : '');
  }, [artistParams]);

  const onPlayQeue = () => {
    startPlaylist(artistData?.topTracks ?? []);
  };

  const renderSwitchedItem = useCallback(
    (index: number, item: any) => {
      switch (index) {
        case 0:
          return (
            <TopTrackItem
              item={item}
              data={artistData?.topTracks?.slice(0, 5) ?? []}
            />
          );
        case 1:
          return (
            <ArtistAlbumItem
              item={item}
              data={artistData?.artistAlbum?.items ?? []}
            />
          );
        case 2:
          return (
            <AlbumReleateItem
              item={item}
              name={artistParams.name}
              data={artistData?.relatedAlbum?.items ?? []}
            />
          );
        case 3:
          return (
            <ArtistRelateItem
              item={item}
              data={artistData?.relatedArtist ?? []}
            />
          );
        default:
          return null;
      }
    },
    [artistData],
  );

  if (isLoading) return <ScreenLoader style={styles.loading} />;

  return (
    <View style={[Layout.fill]}>
      <Banner
        blurHashColor={blurHashColor}
        bgColor={bgColor}
        img={artistInfo?.images[0]?.url}
        name={artistInfo.name}
        translationY={translationY}
      />

      <FloatingButton translationY={translationY} onPress={onPlayQeue} />

      <AnimatedList
        bounces={false}
        overScrollMode="never"
        keyExtractor={item => item.id}
        data={CategoryList}
        onScroll={scrollHandler}
        contentContainerStyle={styles.wrapContent}
        scrollEventThrottle={16}
        ListHeaderComponent={() => (
          <HeaderList
            follower={artistInfo?.followers?.total}
            bgColor={bgColor}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
        renderItem={({ item, index }: any) => {
          return (
            <View style={styles.renderItem}>
              {renderSwitchedItem(index, item)}
            </View>
          );
        }}
      />
    </View>
  );
};

export default ArtistScreen;

const styles = StyleSheet.create({
  wrapContent: {
    backgroundColor: Colors.black.default,
    marginTop: scale(260),
    paddingBottom: scale(360),
  },
  renderItem: { paddingHorizontal: scale(10) },
  divider: {
    height: scale(30),
  },
  loading: {
    flex: 1,
  },
});
