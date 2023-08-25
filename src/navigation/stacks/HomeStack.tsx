import React from 'react';
import { RouteProp } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { HomeTab } from '../tab';
import PlayerStack from './PlayerStack';

export type HomeStackParamList = {
  HomeTab: undefined;
  PlayerStack: undefined;
};
export type HomeStackNavigationProp =
  NativeStackNavigationProp<HomeStackParamList>;

export type HomeStackRouteProps<RouteName extends keyof HomeStackParamList> =
  RouteProp<HomeStackParamList, RouteName>;

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HomeTab" component={HomeTab} />
      <Stack.Screen name="PlayerStack" component={PlayerStack} />
    </Stack.Navigator>
  );
};

export default HomeStack;
