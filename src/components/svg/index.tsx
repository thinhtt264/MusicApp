import * as React from 'react';
import Svg, { G, Path, SvgProps } from 'react-native-svg';

export const LibraryIcon = (props: SvgProps) => (
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
