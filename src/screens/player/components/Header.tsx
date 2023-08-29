import { StyleSheet, Text, View } from 'react-native';
import React, { memo } from 'react';
import isEqual from 'react-fast-compare';
import { StyleProp } from 'react-native';
import { ViewStyle } from 'react-native';
import Layout from 'src/themes/Layout';
import { BoldText } from 'src/components/text';
import { fontScale, scale } from 'src/common/scale';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native';

interface Props {
  LeftIcon?: boolean;
  RightContent?: () => React.ReactNode;
  title: string;
  RightContentStyle?: StyleProp<ViewStyle>;
  onLeftPress?: () => void;
}
const HeaderComponent = (props: Props) => {
  const {
    RightContent,
    title,
    RightContentStyle,
    LeftIcon,
    onLeftPress = () => { },
  } = props;
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[Layout.rowBetween, styles.container, { marginTop: insets.top }]}>
      {LeftIcon ? (
        <TouchableOpacity onPress={onLeftPress}>
          <Ionicons name="chevron-back" color={'white'} size={scale(20)} />
        </TouchableOpacity>
      ) : (
        <View />
      )}
      <BoldText numberOfLines={1} textStyle={styles.title}>{title}</BoldText>
      {RightContent ? (
        <View style={[Layout.rowBetween, RightContentStyle]}>
          {RightContent()}
        </View>
      ) : (
        <View />
      )}
    </View>
  );
};

export const Header = memo(HeaderComponent, isEqual);

const styles = StyleSheet.create({
  container: {
    paddingVertical: scale(15),
    paddingHorizontal: scale(10),
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: fontScale(18),
    textAlignVertical: 'center',
    maxWidth: scale(200)
  },
});
