import { StyleSheet } from 'react-native';
import React from 'react';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { LibraryScreen, LoveListScreen } from 'src/screens';

interface Props {}

export type LibraryStackParamList = {
  LibraryScreen: undefined;
  PlaylistScreen: undefined;
  LoveListScreen: undefined;
};
export type LibraryStackNavigationProp =
  NativeStackNavigationProp<LibraryStackParamList>;

export type LibraryStackRouteProps<
  RouteName extends keyof LibraryStackParamList,
> = RouteProp<LibraryStackParamList, RouteName>;

const Stack = createNativeStackNavigator<LibraryStackParamList>();

const LibraryStack = (props: Props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}>
      <Stack.Screen name="LibraryScreen" component={LibraryScreen} />
      <Stack.Screen name="LoveListScreen" component={LoveListScreen} />
    </Stack.Navigator>
  );
};

export default LibraryStack;

const styles = StyleSheet.create({});
