/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { Suspense } from 'react';
import { StyleSheet, Text, UIManager } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import KeyboardManager from 'react-native-keyboard-manager';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { isIos } from 'src/common/device';
import { store } from 'src/store/store';

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
        {/* <Provider store={store}> */}
        <Suspense fallback={null}>
          <Text>sadasdasdsa</Text>
        </Suspense>
        {/* </Provider> */}
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
