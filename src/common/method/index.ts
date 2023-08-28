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

export const withTimeout = <T>(
  millis: number,
  promise: Promise<T>,
): Promise<T | string> => {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(
      () => reject(`Timed out after ${millis} ms`),
      millis,
    );

    promise
      .then(result => {
        clearTimeout(timeout);
        resolve(result);
      })
      .catch(error => {
        clearTimeout(timeout);
        reject(error);
      });
  });
};

export const getBlurhashColor = async (url: string): Promise<string> => {
  try {
    if (!url) return '';

    const blurhashPromise = Blurhash.encode(url, 2, 2);

    const timeoutPromise = new Promise<string>((resolve, reject) =>
      setTimeout(() => reject(`Timed out after 3000 ms`), 3000)
    );

    const result = await Promise.race<string>([blurhashPromise, timeoutPromise]);

    return !!result === false ? '' : result;
  } catch (error) {
    console.error(error);
    return '';
  }
};
