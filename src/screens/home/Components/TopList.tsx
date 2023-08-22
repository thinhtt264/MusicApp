import { StyleSheet, Text, View } from 'react-native';
import React, { memo } from 'react';
import Layout from 'src/themes/Layout';
import Colors from 'src/themes/Colors';
import { scale } from 'src/common/scale';
import { isIos } from 'src/common/device';
import SnapCarousel from 'react-native-snap-carousel';
import { kWidth } from 'src/common/constants';
import isEqual from 'react-fast-compare';

interface Props {}

const TopListComponent = (props: Props) => {
  return (
    <View style={[Layout.boxShadow, styles.listContainer]}>
      <SnapCarousel
        data={[1, 2, 3, 4, 5]}
        renderItem={({ item }: any) => (
          <View style={{ backgroundColor: 'white', borderWidth:2 }}>
            <Text>Top List</Text>
          </View>
        )}
        layout={'default'}
        inactiveSlideOpacity={1}
        inactiveSlideScale={1}
        sliderWidth={kWidth}
        itemWidth={kWidth}
        enableSnap={true}
        // @ts-ignore
        disableIntervalMomentum={true}
        shouldOptimizeUpdates
        removeClippedSubviews={true}
      />
    </View>
  );
};

export const TopList = memo(TopListComponent, isEqual);

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: Colors.white.default,
    paddingBottom: isIos ? scale(16) : 0,
    marginHorizontal: scale(10),
    marginBottom: scale(20),
    overflow: 'hidden',
    borderWidth:2, borderColor:'yellow'
  },
  listWrapper: {
    overflow: 'hidden',
  },
});
