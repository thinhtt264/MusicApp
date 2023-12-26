import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {  ArtistScreen, SearchScreen } from 'src/screens';

interface Props {}

export type SearchStackParamList = {
  SearchScreen: undefined;
  ArtistScreen: undefined;
};

const Stack = createNativeStackNavigator<SearchStackParamList>();

const SearchStack = (props: Props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}>
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="ArtistScreen" component={ArtistScreen} />
    </Stack.Navigator>
  );
};

export default SearchStack;
