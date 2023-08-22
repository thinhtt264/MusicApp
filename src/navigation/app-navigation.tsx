import React, { useEffect, useState } from 'react';
import RNBootSplash from 'react-native-bootsplash';
import { NavigationContainer } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from 'src/common/redux';
// import RootNavigator from './root-navigator';
import { navigationRef } from 'src/common/navigation';
import i18next from 'i18next';
import { appInit } from 'src/store/action-thunk/AppThunk';
import RootNavigator from './root-navigator';
// import { AppLoader } from 'src/components/loader/AppLoader';
// import { SnackBar } from 'src/components/snack-bar/SnackBar';
// import { SplashScreen } from 'src/screen/splash';
// import i18next from 'src/common/language/i18n';
// import { Alert } from 'src/components/arlert';

export const AppNavigation = () => {
  const { loadingApp } = useAppSelector(state => state.app);
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
    <NavigationContainer ref={navigationRef}>
      <RootNavigator />
      {/* Snack bar */}
      {/* <SnackBar /> */}
      {/* Modal Alert */}
      {/* <Alert /> */}
      {/* App Loader */}
      {/* {loadingApp && <AppLoader />} */}
    </NavigationContainer>
  );
};
