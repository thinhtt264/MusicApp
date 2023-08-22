import { FlatList, StyleSheet, View } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { Container } from 'src/components/container';
import { HomeItem } from './Components';
import Animated from 'react-native-reanimated';
import { HomeData } from './Components/HomeData';
import { scale } from 'src/common/scale';
import { dispatch } from 'src/common/redux';
import { getHomePlaylist } from 'src/store/action-thunk';

interface Props { }
const AnimatedList = Animated.createAnimatedComponent(FlatList);

const HomeScreen = (props: Props) => {
  const scrollRef = useRef<any>(null);

  const onGetHomeData = async (): Promise<void> => {
    // setIsLoading(true);
    Promise.all([
      dispatch(getHomePlaylist({})),
    ])
      .then(() => {
        //handle success
      })
      .finally(() => {
        // setIsLoading(false);
      });
  };

  useEffect(() => {
    onGetHomeData();
  }, []);

  return (
    <Container>
      <AnimatedList
        ref={scrollRef}
        bounces={false}
        // onScroll={scrollHandler}
        scrollEventThrottle={16}
        style={{ flex: 1 }}
        data={[1]}
        showsVerticalScrollIndicator={false}
        renderItem={() => (
          <View style={styles.wrapper}>
            <FlatList
              data={HomeData}
              renderItem={({ item }) => <HomeItem item={item} />}
            />
            {/* <TouchableOpacity
              onPress={onBackToTop}
              style={[styles.backToTop, Layout.rowCenter]}>
              <Icon
                name="arrow-upward"
                size={scale(22)}
                style={[styles.textColor, { marginRight: scale(5) }]}
              />
              <BoldText
                textStyle={[styles.textColor, { marginVertical: scale(15) }]}>
                {translate('button:backToTop')}
              </BoldText>
            </TouchableOpacity> */}
          </View>
        )}
      />
    </Container>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    width: '100%',
    flexGrow: 1,
    borderTopRightRadius: 32,
    borderTopLeftRadius: 32,
    paddingTop: scale(32),
  },
});
