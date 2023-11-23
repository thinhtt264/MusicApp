import React, { useEffect, useState } from 'react';
import RNBootSplash from 'react-native-bootsplash';
import { NavigationContainer } from '@react-navigation/native';
import { RXStore, useAppDispatch, useAppSelector } from 'src/common/redux';
import { navigationRef } from 'src/common/navigation';
import { appInit } from 'src/store/action-thunk/AppThunk';
import RootNavigator from './root-navigator';
import { MyAppTheme } from 'src/themes';
import { AppLoader } from 'src/components/loader';
import TrackPlayer from 'react-native-track-player';
import { Host } from 'react-native-portalize';
import { getTimeSinceStartup } from 'react-native-startup-time';

export const AppNavigation = () => {
  const { loadingApp, theme, env } = useAppSelector(state => state.app);
  const [init, setInit] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const init = async () => {
      await dispatch(appInit());
      await TrackPlayer.setupPlayer();
    };
    init().finally(() => {
      setInit(true);
      RNBootSplash.hide({ fade: true });
    });
    // getTimeSinceStartup().then(time => {
    //   console.log(`Time since startup: ${time} ms`);
    //   alert(time);
    // });
  }, []);

  return (
    <NavigationContainer theme={MyAppTheme[theme]} ref={navigationRef}>
      {init && env && (
        <Host>
          <RootNavigator />
        </Host>
      )}
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
