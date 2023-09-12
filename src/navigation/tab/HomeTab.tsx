import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { fontScale, scale } from 'src/common/scale/index';
import { hasNotch } from 'src/common/device';
import { BoldText } from 'src/components/text';
import { translate } from 'src/common/language/translate';

import Octicons from 'react-native-vector-icons/Octicons';
import Colors from 'src/themes/Colors';
import { LibraryIcon } from 'src/components/svg';
import { HomeScreen, SearchScreen } from 'src/screens';

interface Props {
  size: number;
  color: string;
  name?: string;
}
const HomeIcon = (props: Props) => {
  const { size, color, name } = props;
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View>{renderIcon(props)}</View>
    </View>
  );
};

const renderIcon = (props: Props) => {
  const { size, color, name } = props;
  switch (name) {
    case 'Home': {
      return <Octicons name="home" size={size} color={color} />;
    }
    case 'Search': {
      return <Octicons name="search" size={size} color={color} />;
    }
    case 'Library': {
      return (
        <LibraryIcon
          color={color}
          height={size}
          width={size}
          viewBox={`5 0 ${size} ${size}`}
        />
      );
    }
  }
};
export const TabBar = (props: BottomTabBarProps) => {
  const { state, descriptors, navigation } = props;
  return (
    <View style={[styles.container]}>
      <View style={{ flexDirection: 'row' }}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : translate(`home:${route.name.toLocaleLowerCase()}`);

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };
          return (
            <TouchableOpacity
              key={label.toString()}
              onPress={onPress}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                height: TAB_HEIGHT,
              }}>
              <HomeIcon
                color={isFocused ? Colors.white.default : Colors.unActive}
                size={scale(25)}
                name={route.name}
              />
              <BoldText
                textStyle={{
                  fontSize: fontScale(scale(9)),
                  color: isFocused ? Colors.white.default : Colors.unActive,
                }}>
                {label.toString()}
              </BoldText>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={styles.overlay} />
    </View>
  );
};

export type HomeTabParamList = {
  Home: undefined;
  Search: undefined;
  Library: undefined;
};

const Tab = createBottomTabNavigator<HomeTabParamList>();

const HomeTab = () => {
  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
        tabBar={TabBar}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Library" component={HomeScreen} />
      </Tab.Navigator>
    </View>
  );
};

const TAB_HEIGHT = hasNotch() ? scale(55) : scale(45);
const styles = StyleSheet.create({
  container: {
    height: TAB_HEIGHT,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    borderTopWidth: 0,
    shadowOpacity: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'black',
    opacity: 0.8,
    zIndex: -1,
  },
});
export default HomeTab;