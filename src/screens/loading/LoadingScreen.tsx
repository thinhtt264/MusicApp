import { StyleSheet } from 'react-native';
import React, { memo } from 'react';
import isEqual from 'react-fast-compare';
import { MaterialIndicator } from 'react-native-indicators';

import { Container } from 'src/components/container';
import Layout from 'src/themes/Layout';
import Colors from 'src/themes/Colors';
import { scale } from 'src/common/scale';

interface Props {}

const LoadingScreenComponent = (props: Props) => {
  return (
    <Container style={Layout.center}>
      <MaterialIndicator size={scale(40)} color={Colors.green.default} />
    </Container>
  );
};

export const LoadingScreen = memo(LoadingScreenComponent, isEqual);

const styles = StyleSheet.create({});
