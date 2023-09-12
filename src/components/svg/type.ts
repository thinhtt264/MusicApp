import { AnimatedProps } from "react-native-reanimated";
import { PathProps, SvgProps } from "react-native-svg";

export interface SVGProps  extends SvgProps{
  color?: string;
  size?: number;
}
