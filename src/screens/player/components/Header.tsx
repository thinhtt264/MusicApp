import { StyleSheet, View } from 'react-native';
import React, { memo } from 'react';
import isEqual from 'react-fast-compare';
import { StyleProp } from 'react-native';
import { ViewStyle } from 'react-native';
import Layout from 'src/themes/Layout';
import { RegularText } from 'src/components/text';
import { fontScale, scale } from 'src/common/scale';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native';
import { translate } from 'src/common/language/translate';

interface Props {
  LeftIcon?: boolean;
  RightContent?: () => React.ReactNode;
  RightContentStyle?: StyleProp<ViewStyle>;
  onLeftPress?: () => void;
  from: 'search' | 'playlist';
}

const HeaderComponent = (props: Props) => {
  const {
    RightContent,
    RightContentStyle,
    LeftIcon,
    onLeftPress = () => {},
    from,
  } = props;
  const insets = useSafeAreaInsets();

  const titleRender = () => {
    switch (from) {
      case 'search':
        return translate('player:fromSearch');
      default:
        break;
    }
  };

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
      <RegularText numberOfLines={1} textStyle={styles.title}>
        {titleRender()}
      </RegularText>
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
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: fontScale(12),
    textAlignVertical: 'center',
    maxWidth: scale(200),
  },
});
