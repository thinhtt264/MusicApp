import { Alert, Platform } from 'react-native';
import { Blurhash } from 'react-native-blurhash';
import { RGB } from 'react-native-blurhash/lib/typescript/utils';

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
      setTimeout(() => reject(`Timed out after 3000 ms`), 3000),
    );

    const result = await Promise.race<string>([
      blurhashPromise,
      timeoutPromise,
    ]);

    return !!result === false ? '' : result;
  } catch (error) {
    console.error(error);
    return '';
  }
};

export function decodeDC(value: number) {
  const intR = value >> 16;
  const intG = (value >> 8) & 255;
  const intB = value & 255;
  return {
    r: sRGBToLinear(intR) * 255,
    g: sRGBToLinear(intG) * 255,
    b: sRGBToLinear(intB) * 255,
  };
}

export function decode83(str: string): number {
  let value = 0;
  for (let i = 0; i < str.length; i++) {
    const c = str[i];
    const digit = digitCharacters.indexOf(c);
    value = value * 83 + digit;
  }
  return value;
}

export const decode = (blurhash: string) => {
  if (blurhash == null || blurhash.length < 7) return undefined;

  const value = decode83(blurhash.substring(4, 11));
  return decodeDC(value);
};

function sRGBToLinear(value: number): number {
  const v = value / 255;
  if (v <= 0.04045) return v / 12.92;
  else return Math.pow((v + 0.055) / 1.055, 2.4);
}

export function decodeBlurhashToRGB(blurhash: string): RGB[] {
  if (!blurhash || blurhash.length < 6) return [];

  const width = decode83(blurhash.slice(0, 2));
  const height = decode83(blurhash.slice(2, 4));
  const colorValues = blurhash.slice(4);

  const colors: RGB[] = [];

  for (let i = 0; i < colorValues.length; i += 4) {
    const colorValue = colorValues.slice(i, i + 4);
    const value = decode83(colorValue);

    const r = (value >> 16) & 255;
    const g = (value >> 8) & 255;
    const b = value & 255;

    colors.push({ r, g, b });
  }

  return colors;
}

const digitCharacters = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
  '#',
  '$',
  '%',
  '*',
  '+',
  ',',
  '-',
  '.',
  ':',
  ';',
  '=',
  '?',
  '@',
  '[',
  ']',
  '^',
  '_',
  '{',
  '|',
  '}',
  '~',
];
