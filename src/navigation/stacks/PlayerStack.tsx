import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { PlayerScreen } from 'src/screens';

interface Props {}

export type PlayerStackParamList = {
  PlayerScreen: {
    trackUrl: string;
  };
};
export type NewsStackNavigationProp =
  NativeStackNavigationProp<PlayerStackParamList>;

export type NewsStackRouteProps<RouteName extends keyof PlayerStackParamList> =
  RouteProp<PlayerStackParamList, RouteName>;

const Stack = createNativeStackNavigator<PlayerStackParamList>();

const PlayerStack = (props: Props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}>
      <Stack.Screen name="PlayerScreen" component={PlayerScreen} />
    </Stack.Navigator>
  );
};

export default PlayerStack;

const styles = StyleSheet.create({});
