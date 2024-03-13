/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { Suspense } from 'react';
import { UIManager, StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import KeyboardManager from 'react-native-keyboard-manager';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { isIos } from 'src/common/device';
import { store } from 'src/store/store';
import { AppNavigation } from 'src/navigation/app-navigation';
import { I18nextProvider } from 'react-i18next';
import i18next from 'src/common/language/i18n';

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
      <StatusBar backgroundColor={'#0c0d0d'} barStyle={'light-content'} />
      <SafeAreaProvider>
        <Provider store={store}>
          <I18nextProvider i18n={i18next}>
            <Suspense fallback={null}>
              <AppNavigation />
            </Suspense>
          </I18nextProvider>
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
