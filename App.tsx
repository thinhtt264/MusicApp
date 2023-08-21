/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { Suspense } from 'react';
import { StyleSheet, Text, UIManager, Button } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import KeyboardManager from 'react-native-keyboard-manager';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { isIos } from 'src/common/device';
import { authLogin } from 'src/store/ApiCall/Auth';
import { store } from 'src/store/store';
import { useAppDispatch } from './src/common/redux/index';

function Test() {
  const dispatch = useAppDispatch();
  const onPress = async () => {
    const authResponse = await dispatch(
      authLogin({
        grant_type: 'client_credentials',
        client_id: '9ebf1326555f474e8e49a2eba0350278',
        client_secret: 'd2bd2c1558ca4105a59484d29d92e95a',
      }),
    );
    console.log(authResponse);
  };

  return <Button title="test" onPress={onPress} />;
}

const App = () => {
  if (!isIos) {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  } else {
    KeyboardManager.setEnable(true);
    KeyboardManager.setLayoutIfNeededOnUpdate(true);
    KeyboardManager.setEnableDebugging(false);
    KeyboardManager.setKeyboardDistanceFromTextField(10);
    KeyboardManager.setEnableAutoToolbar(false);
    KeyboardManager.setOverrideKeyboardAppearance(true);
    KeyboardManager.setKeyboardAppearance('default');
    KeyboardManager.setShouldResignOnTouchOutside(true);
    KeyboardManager.setShouldPlayInputClicks(true);
    KeyboardManager.resignFirstResponder();
    KeyboardManager.reloadLayoutIfNeeded();
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Provider store={store}>
          <Suspense fallback={null}>
            <Text>sadasdasdsa</Text>
            <Test></Test>
          </Suspense>
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
