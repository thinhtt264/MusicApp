import { Alert, Platform } from 'react-native';

type TypesBase =
  | 'bigint'
  | 'boolean'
  | 'function'
  | 'number'
  | 'object'
  | 'string'
  | 'symbol'
  | 'undefined';

export const onShowErrorBase = (msg: string) => {
  Alert.alert(msg);
};
export const onCheckType = (
  source: any,
  type: TypesBase,
): source is TypesBase => {
  return typeof source === type;
};

export const expiredTime = (expired: number) => {
  const currentTime = new Date(Date.now());
  currentTime.setSeconds(currentTime.getSeconds() + expired);
  return currentTime.valueOf();
};
