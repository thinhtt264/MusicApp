import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { dispatch, useAppSelector } from 'src/common/redux';
import HomeStack from './stacks/HomeStack';
import { authRequestToken } from 'src/store/action-thunk';

const RootStack = createNativeStackNavigator();

const RootNavigator = () => {
  const { isLogin, access_token } = useAppSelector(state => state.auth);
  const { env } = useAppSelector(state => state.app);

  const requestToken = async () => {
    await dispatch(
      authRequestToken({
        client_id: env?.CLIENT_ID ?? '',
        client_secret: env?.CLIENT_SECRET ?? '',
        baseUrl: env?.AUTH_URL ?? '',
      }),
    );
  };

  useEffect(() => {
    if (!isLogin && !access_token) requestToken();
  }, [isLogin]);

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
