import {
  StackActions,
  createNavigationContainerRef,
} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef<any>();

export function navigate(name: string, params?: any) {
  navigationRef?.navigate(name, params);
}

export function replace(name: string, params?: any) {
  navigationRef?.dispatch(StackActions.replace(name, params));
}

export function reset(params?: any) {
  navigationRef?.reset(params);
}

export function goBack() {
  if (navigationRef.current?.canGoBack?.()) {
    navigationRef?.goBack();
  }
}
