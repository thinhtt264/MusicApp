import { StyleSheet } from 'react-native';
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { BottomSheetProps } from './type';
import { useTheme } from 'src/themes';
import Colors from 'src/themes/Colors';

const BottomModal = forwardRef((props: BottomSheetProps, ref) => {
  const { colors } = useTheme();

  const { snapPoints = ['50%', '100%'], children, onCloseModal } = props;
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPointBottomSheet = useMemo(() => snapPoints, []);

  const handleSheetChanges = useCallback((index: number) => {
    // console.log('handleSheetChanges', index);
  }, []);

  useImperativeHandle(ref, () => ({
    onOpen: (index: number) => openBottomSheet(index),
    onClose: () => bottomSheetRef.current?.close(),
  }));

  const openBottomSheet = (index: number) => {
    bottomSheetRef.current?.snapToIndex(index);
  };

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        onPress={onCloseModal}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    [],
  );

  return (
    <BottomSheet
      // handleStyle={{ backgroundColor: colors.info }}
      backgroundStyle={{ backgroundColor: colors.info }}
      handleIndicatorStyle={{ backgroundColor: Colors.unActive }}
      ref={bottomSheetRef}
      index={-1}
      backdropComponent={renderBackdrop}
      enablePanDownToClose={true}
      snapPoints={snapPointBottomSheet}
      onChange={handleSheetChanges}>
      {children}
    </BottomSheet>
  );
});

export default BottomModal;

const styles = StyleSheet.create({
  contentContainer: {},
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // màu đen với độ mờ là 0.5
  },
});
