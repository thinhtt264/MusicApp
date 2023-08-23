import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { memo } from 'react';
import { HomeFileds } from './HomeData';
import { fontScale, scale } from 'src/common/scale';
import { BoldText, SemiBoldText } from 'src/components/text';
import { useScreenController } from 'src/common/hooks';
import Colors from 'src/themes/Colors';
import Layout from 'src/themes/Layout';
import isEqual from 'react-fast-compare';
import { TopList } from './TopList';
import { useAppSelector } from 'src/common/redux';

interface Props {
  item: HomeFileds;
  // isLoading: boolean;
}

const HomeItemComponent = ({ item }: Props) => {
  const { dispatch, navigation, translate } = useScreenController();
  const { homedata, playlist } = useAppSelector(state => state.home);

  const toplist = homedata.items.slice(0, 10);
  const recommend = homedata.items.slice(10);
  const popular = playlist.items;

  const onNavigate = (): void => {};
  return (
    <View>
      <View
        style={[
          Layout.rowBetween,
          {
            alignItems: 'flex-start',
            marginHorizontal: scale(16),
            marginTop: scale(10),
          },
        ]}>
        <BoldText textStyle={styles.title}>{item.title}</BoldText>

        <TouchableOpacity delayPressIn={100} onPress={onNavigate}>
          <SemiBoldText textStyle={styles.viewText}>
            {translate('home:viewAll')}
          </SemiBoldText>
        </TouchableOpacity>
      </View>
      {item.type === 'toplist' && <TopList homedata={toplist} />}
      {item.type === 'recommend' && <TopList homedata={recommend} />}
      {item.type === 'popular' && <TopList homedata={popular} />}
    </View>
  );
};

export const HomeItem = memo(HomeItemComponent, isEqual);

const styles = StyleSheet.create({
  title: {
    fontSize: fontScale(22),
    marginRight: scale(10),
    color: Colors.green.default,
    marginBottom: scale(24),
    flex: 1,
  },
  viewText: {
    fontSize: fontScale(12),
    marginTop: scale(10),
    color: Colors.green.default,
  },
});
