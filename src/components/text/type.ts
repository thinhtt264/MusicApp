import { TextProps, TextStyle, StyleProp } from 'react-native';

export interface CustomTextProps extends TextProps {
  /**
   * Overwrite style for text
   * @default undefined
   */
  textStyle?: StyleProp<TextStyle>;
}
