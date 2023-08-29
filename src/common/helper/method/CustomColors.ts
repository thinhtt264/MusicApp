import { Blurhash } from 'react-native-blurhash';


const isWhiteishRgb = (
  rgbObject: { r: number; g: number; b: number },
  threshold: number,
) => {
  return (
    (rgbObject.r >= 255 * threshold && rgbObject.g >= 255 * threshold) ||
    (rgbObject.r >= 255 * threshold && rgbObject.b >= 255 * threshold) ||
    (rgbObject.g >= 255 * threshold && rgbObject.b >= 255 * threshold)
  );
};

export const getBlurhashColor = async (url: string): Promise<string> => {
  try {
    if (!url) return '';

    const blurhashPromise = Blurhash.encode(url, 1, 2);

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
    r: sRGBToLinear(intR) * 255 + 20,
    g: sRGBToLinear(intG) * 255 + 20,
    b: sRGBToLinear(intB) * 255 + 20,
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

export const getBackGroundPlayer = async (link: string) => {
  const blurhash = await getBlurhashColor(link);
  if (blurhash == null || blurhash.length < 7) return undefined;

  const value = decode83(blurhash.substring(2, 6));
  const rgbString = decodeDC(value);
  const isWhiteColor = isWhiteishRgb(rgbString, 0.65);

  if (isWhiteColor) return 'rgb(72,72,72)';
  return `rgb(${rgbString.r}, ${rgbString.g}, ${rgbString.b})`;
};

function sRGBToLinear(value: number): number {
  const v = value / 255;
  if (v <= 0.04045) return v / 12.92;
  else return Math.pow((v + 0.055) / 1.055, 2.4);
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
