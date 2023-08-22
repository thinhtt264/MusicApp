import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useAppSelector } from 'src/common/redux';
import HomeStack from './stacks/HomeStack';

const RootStack = createNativeStackNavigator();

const RootNavigator = () => {
  const { isLogin } = useAppSelector(state => state.auth);

  return (
    <RootStack.Navigator
      screenOptions={{ headerShown: false, animation: 'fade' }}>
      {isLogin ? (
        <RootStack.Screen name="MainStack" component={HomeStack} />
      ) : (
        <RootStack.Screen name="MainStack" component={HomeStack} />
      )}
    </RootStack.Navigator>
  );
};

export default RootNavigator;
