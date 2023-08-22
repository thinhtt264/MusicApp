import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Layout from 'src/themes/Layout';
import Colors from 'src/themes/Colors';
import { scale } from 'src/common/scale';
import { isIos } from 'src/common/device';
import SnapCarousel from 'react-native-snap-carousel';
import { kWidth } from 'src/common/constants';

interface Props {}

const TopList = (props: Props) => {
  return (
    <View style={[Layout.boxShadow, styles.listContainer]}>
      <SnapCarousel
        data={[1, 2, 3, 4, 5]}
        renderItem={({ item }: any) => (
          <View style={{ backgroundColor: 'white' }}>
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

export default TopList;

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: Colors.white.default,
    borderRadius: 16,
    paddingTop: scale(16),
    paddingBottom: isIos ? scale(16) : 0,
    paddingHorizontal: scale(10),
    marginHorizontal: scale(16),
    marginBottom: scale(24),
  },
  listWrapper: {
    overflow: 'hidden',
  },
});
