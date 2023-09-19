import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { dispatch, useAppSelector } from 'src/common/redux';
import HomeStack from './stacks/HomeStack';
import { authRequestToken } from 'src/store/action-thunk';
import { LoadingScreen } from 'src/screens';

const RootStack = createNativeStackNavigator();

const RootNavigator = () => {
  const { isLogin, access_token, tokenExpiration } = useAppSelector(
    state => state.auth,
  );
  const { env } = useAppSelector(state => state.app);
  const tokenReady = !!access_token && !(tokenExpiration <= Date.now());

  const requestToken = async () => {
    await dispatch(
      authRequestToken({
        client_id: env?.CLIENT_ID ?? '',
        client_secret: env?.CLIENT_SECRET ?? '',
        baseUrl: env?.AUTH_URL ?? '',
      }),
    );
  };

  useEffect(() => {}, [access_token]);

  useEffect(() => {
    if (isLogin) {
      if (!access_token || !tokenReady) {
        setTimeout(() => {
          requestToken();
        }, 1000);
      } else {
      }
    }
  }, [isLogin]);

  return (
    <RootStack.Navigator
      screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      {isLogin ? (
        tokenReady ? (
          <RootStack.Screen name="HomeStack" component={HomeStack} />
        ) : (
          <RootStack.Screen name="LoadingScreen" component={LoadingScreen} />
        )
      ) : (
        <RootStack.Screen name="AuthStack" component={AuthStack} />
      )}
    </RootStack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <RootStack.Navigator
      screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <RootStack.Screen name="AuthScreen" component={HomeStack} />
    </RootStack.Navigator>
  );
};
export default RootNavigator;
