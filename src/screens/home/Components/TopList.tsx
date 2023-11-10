import { StyleSheet, Text, View } from 'react-native';
import React, { memo } from 'react';
import Layout from 'src/themes/Layout';
import Colors from 'src/themes/Colors';
import { scale } from 'src/common/scale';
import { isIos } from 'src/common/device';
import isEqual from 'react-fast-compare';
import { AnimatedList } from 'src/components/list';
import { AnimatedImage } from 'src/components/image';
import { HomeDataItemFields } from 'src/models/Api';
import Divider from 'src/components/divier';

const TopListComponent = ({ homedata }: any) => {
  return (
    <View style={[Layout.boxShadow, styles.listContainer]}>
      <AnimatedList
        data={homedata}
        horizontal
        ItemSeparatorComponent={() => <Divider width={scale(8)} />}
        renderItem={({ item }: HomeDataItemFields) => {
          return (
            <View style={styles.listWrapper}>
              <AnimatedImage
                source={item.images[0].url}
                resizeMode="contain"
                containerStyle={Layout.fullSize}
              />
            </View>
          );
        }}
      />
    </View>
  );
};

export const TopList = memo(TopListComponent, isEqual);

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: Colors.black.default,
    paddingBottom: isIos ? scale(16) : 0,
    marginHorizontal: scale(10),
    marginBottom: scale(20),
    overflow: 'hidden',
  },
  listWrapper: {
    overflow: 'hidden',
    width: scale(120),
    height: scale(120),
  },
});
