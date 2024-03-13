import {
  StatusBar,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, { useEffect } from 'react';
import Layout from 'src/themes/Layout';
import { BoldText } from '../../../components/text';
import { fontScale, scale } from 'src/common/scale';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from 'src/themes/Colors';
import LinearGradient from 'react-native-linear-gradient';
import { navigation } from 'src/common/navigation';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { isIos } from 'src/common/device';

interface Props {
  RightContent?: () => React.ReactNode;
  title: string;
  RightContentStyle?: StyleProp<ViewStyle>;
}
export const Header_Height = scale(160);

const HeaderComponent = (props: Props) => {
  const { RightContent, title, RightContentStyle } = props;

  useEffect(() => {
    if (!isIos) {
      StatusBar.setBackgroundColor('transparent');
      StatusBar.setTranslucent(true);
    }
  }, []);

  return (
    <View style={[styles.container]}>
      <LinearGradient
        style={styles.linearGradient}
        locations={[0.2, 1]}
        colors={['#223379', 'black']}
      />
      <View
        style={[
          styles.body,
          { marginTop: useSafeAreaInsets().top + scale(15) },
        ]}>
        <View style={[Layout.rowBetween]}>
          <TouchableOpacity onPress={navigation.goBack}>
            <Ionicons
              style={{ marginLeft: scale(-2) }}
              name="arrow-back"
              size={scale(24)}
              color={Colors.white.default}
            />
          </TouchableOpacity>
          {RightContent && (
            <View style={[Layout.rowBetween, RightContentStyle]}>
              {RightContent()}
            </View>
          )}
        </View>
        <View style={[Layout.rowBetween, styles.wrapTitle]}>
          <BoldText textStyle={styles.title}>{title}</BoldText>
        </View>
      </View>
    </View>
  );
};

export const BackHeader = HeaderComponent;

const styles = StyleSheet.create({
  container: {
    marginBottom: scale(5),
    height: Header_Height,
  },
  body: {
    paddingHorizontal: scale(15),
  },
  title: {
    fontSize: fontScale(24),
    textAlignVertical: 'center',
    marginBottom: scale(2),
  },
  wrapTitle: {
    marginTop: scale(30),
  },
  linearGradient: {
    height: scale(250),
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
});
