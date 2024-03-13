import React, { useEffect, useState } from 'react';
import RNBootSplash from 'react-native-bootsplash';
import { NavigationContainer } from '@react-navigation/native';
import { RXStore, useAppDispatch, useAppSelector } from 'src/common/redux';
import { navigationRef } from 'src/common/navigation';
import { appInit } from 'src/store/action-thunk/AppThunk';
import RootNavigator from './root-navigator';
import { MyAppTheme } from 'src/themes';
import TrackPlayer from 'react-native-track-player';
import { Host } from 'react-native-portalize';
import { SnackBar } from 'src/components/snack-bar';

export const AppNavigation = () => {
  const { theme, env } = useAppSelector(state => state.app);
  const [init, setInit] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const initial = async () => {
      await dispatch(appInit());
      await TrackPlayer.setupPlayer();
    };
    initial().finally(() => {
      setInit(true);
      RNBootSplash.hide({ fade: true });
    });
  }, []);

  return (
    <NavigationContainer theme={MyAppTheme[theme]} ref={navigationRef}>
      {init && env && (
        <Host>
          <RootNavigator />
        </Host>
      )}
      {/* Snack bar */}
      <SnackBar />
      {/* Modal Alert */}
      {/* <Alert /> */}
      {/* App Loader */}
      {/* {loadingApp && <AppLoader />} */}
      <RXStore />
    </NavigationContainer>
  );
};
