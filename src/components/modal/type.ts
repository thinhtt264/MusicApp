import { ReactNode } from 'react';
import { SharedValue } from 'react-native-reanimated';

export interface BottomSheetProps {
  snapPoints?:
    | (string | number)[]
    | SharedValue<(string | number)[]>
    | Readonly<(string | number)[] | SharedValue<(string | number)[]>>;
  children: ReactNode;
}

export type BottomSheetRef = {
  onOpen: (index: 0 | 1) => {};
  onClose: () => {};
};
