import { ScrollView, View } from 'react-native';
import React, { memo } from 'react';
import equals from 'react-fast-compare';
import { SafeAreaView } from 'react-native-safe-area-context';
import Layout from 'src/themes/Layout';
import { ScrollContainerProps } from './type';

const ScrollContainerComponent = (props: ScrollContainerProps) => {
  const { safeAreaProps, style, contentContainerStyle } = props;
  return (
    <SafeAreaView style={[Layout.fill]} edges={['top']} {...safeAreaProps}>
      <View style={[Layout.fill, style]}>
        <ScrollView
          contentContainerStyle={contentContainerStyle}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          {props.children}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export const ScrollContainer = memo(ScrollContainerComponent, equals);
