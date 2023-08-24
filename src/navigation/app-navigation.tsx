import React, { useEffect } from 'react';
import RNBootSplash from 'react-native-bootsplash';
import { NavigationContainer } from '@react-navigation/native';
import { RXStore, useAppDispatch, useAppSelector } from 'src/common/redux';
import { navigationRef } from 'src/common/navigation';
import { appInit } from 'src/store/action-thunk/AppThunk';
import RootNavigator from './root-navigator';
import { MyAppTheme } from 'src/themes';

export const AppNavigation = () => {
  const { loadingApp, theme, env } = useAppSelector(state => state.app);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const init = async () => {
      const store = await dispatch(appInit());
    };
    init().finally(() => {
      setTimeout(() => {
        RNBootSplash.hide({ fade: true });
      }, 1000);
    });
  }, []);

  return (
    <NavigationContainer theme={MyAppTheme[theme]} ref={navigationRef}>
      {env && <RootNavigator />}
      {/* Snack bar */}
      {/* <SnackBar /> */}
      {/* Modal Alert */}
      {/* <Alert /> */}
      {/* App Loader */}
      {/* {loadingApp && <AppLoader />} */}
      <RXStore />
    </NavigationContainer>
  );
};
