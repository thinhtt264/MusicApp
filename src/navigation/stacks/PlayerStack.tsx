import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PlayerScreen } from 'src/screens';

export type PlayerStackParamList = {
  PlayerScreen: {
    trackUrl: string;
  };
};

const Stack = createNativeStackNavigator<PlayerStackParamList>();

const PlayerStack = () => {
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
