import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { fontScale, scale } from 'src/common/scale/index';
import { hasNotch, isIos } from 'src/common/device';
import { RegularText } from 'src/components/text';

import Octicons from 'react-native-vector-icons/Octicons';
import Colors from 'src/themes/Colors';
import routeNames from '../RouteNames';
import HomeScreen from 'src/screens/home/HomeScreen';

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
    case 'List': {
      return <Octicons name="list-unordered" size={size} color={color} />;
    }
    case 'Camera': {
      return <Octicons name="device-camera-video" size={size} color={color} />;
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
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            if (label.toString() !== 'Plus') {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });
              if (!isFocused && !event.defaultPrevented) {
                // The `merge: true` option makes sure that the params inside the tab screen are preserved
                navigation.navigate(route.name);
              }
            } else {
              navigation.navigate(routeNames.Stacks.AuthStack);
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
                color={isFocused ? '#549994' : Colors.unActive}
                size={26}
                name={label.toString()}
              />
              <RegularText
                textStyle={{
                  fontSize: fontScale(scale(10)),
                  color: isFocused ? '#549994' : Colors.unActive,
                }}>
                {label.toString()}
              </RegularText>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export type HomeTabParamList = {
  Home: undefined;
  List: undefined;
  Camera: undefined;
  Profile: undefined;
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
        <Tab.Screen name="List" component={HomeScreen} />
        <Tab.Screen name="Camera" component={HomeScreen} />
      </Tab.Navigator>
    </View>
  );
};

const TAB_HEIGHT = hasNotch() ? scale(65) : scale(50);
const styles = StyleSheet.create({
  container: {
    height: TAB_HEIGHT,
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.0,
    backgroundColor: 'white',
    borderTopRightRadius: scale(20),
    borderTopLeftRadius: scale(20),
    elevation: 10,
  },
  plusIcon: {
    position: 'absolute',
    top: -scale(27.5),
    backgroundColor: '#438883',
    width: scale(55),
    height: scale(55),
    borderRadius: scale(27.5),
    shadowColor: '#549994',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 20,
  },
});
export default HomeTab;
