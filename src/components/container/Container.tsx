import { View } from 'react-native';
import React, { memo } from 'react';
import isEquals from 'react-fast-compare';
import { SafeAreaView } from 'react-native-safe-area-context';
import Layout from 'src/themes/Layout';
import { ContainerProps } from './type';

const ContainerComponent = (props: ContainerProps) => {
  const { safeAreaProps } = props;
  return (
    <SafeAreaView style={[Layout.fill]} edges={['top']} {...safeAreaProps}>
      <View style={[Layout.fill, props.style]}>{props.children}</View>
    </SafeAreaView>
  );
};

export const Container = memo(ContainerComponent, isEquals);
