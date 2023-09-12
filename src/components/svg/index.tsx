import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import { SVGProps } from './type';

export const LibraryIcon = (props: SVGProps) => (
  <Svg height="100%" width="100%" {...props}>
    <Path
      stroke={props.color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 26V6M13 6v20M19 6.043l5.336 19.913"
    />
  </Svg>
);
