import React from 'react';
import { RouteProp } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { HomeScreen } from 'src/screens';

export type HomeStackParamList = {
  HomeTab: undefined;
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
      <Stack.Screen name="HomeTab" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
