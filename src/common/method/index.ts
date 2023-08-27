import { Alert, Platform } from 'react-native';
import { Blurhash } from 'react-native-blurhash';

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

export const getBlurhashColor = async (url: string) => {
  if (!url) return '';

  const blurhashPromise = await Blurhash.encode(url, 2, 2);

  return Promise.race([
    blurhashPromise,
    new Promise(resolve => setTimeout(() => resolve(false), 2000)), // Timeout after 2000ms (2 seconds)
  ]);
};
