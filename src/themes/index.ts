import { Theme, useTheme as useThemeRN } from '@react-navigation/native';
import { ColorDark, ColorLight } from './ColorTheme';

type ColorLight = typeof ColorLight;
type ColorDark = typeof ColorDark;

export type Colors = ColorLight & ColorDark;
export type AppTheme = { dark: boolean; colors: Colors };

const Light: AppTheme = {
  dark: false,
  colors: ColorLight,
};
const Dark: AppTheme = {
  dark: true,
  colors: ColorDark,
};
export const MyAppTheme = {
  light: Light,
  dark: Dark,
};

export type ThemeType = keyof typeof MyAppTheme;

export const useTheme = () => {
  const payload = useThemeRN() as AppTheme;
  return payload;
};
