import React from 'react';
import { RouteProp } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { HomeTab } from '../tab';
import {
  AlbumListScreen,
  AlbumScreen,
  ArtistScreen,
  PlayListScreen,
} from 'src/screens';

export type HomeStackParamList = {
  HomeTab: undefined;
  PlayerStack: undefined;
  ArtistScreen: undefined;
  AlbumScreen: undefined;
  PlaylistScreen: undefined;
  AlbumListScreen: undefined;
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
        animation: 'fade',
      }}>
      <Stack.Screen name="HomeTab" component={HomeTab} />
      <Stack.Screen name="ArtistScreen" component={ArtistScreen} />
      <Stack.Screen name="AlbumScreen" component={AlbumScreen} />
      <Stack.Screen name="PlaylistScreen" component={PlayListScreen} />
      <Stack.Screen name="AlbumListScreen" component={AlbumListScreen} />
      {/* <Stack.Screen name="PlayerStack" component={PlayerStack} /> */}
    </Stack.Navigator>
  );
};

export default HomeStack;
