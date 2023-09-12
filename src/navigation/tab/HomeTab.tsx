import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
import { useProgress } from 'react-native-track-player';
import Animated, { Extrapolate, cancelAnimation, interpolate, runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { kHeight } from 'src/common/constants';

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

const FloatingPlayer = () => {
  const { position } = useProgress()
  const translateY = useSharedValue(0);

  const toggleFullScreen = () => {
    if (Math.abs(translateY.value) < kHeight / 2) {
      translateY.value = withTiming((-(kHeight - TAB_HEIGHT)), { duration: 800 });
    } else {
      translateY.value = withTiming(0, { duration: 800 });
    }
  };

  const onEndDrag = () => {
    if (Math.abs(translateY.value) > kHeight * 65 / 100) {
      translateY.value = withTiming((-(kHeight - TAB_HEIGHT)), { duration: 800 });
    } else {
      translateY.value = withTiming(0, { duration: 800 });
    }
  }

  const animatedStyle = useAnimatedStyle(() => {
    const heightz = interpolate(translateY.value, [0, -(kHeight - TAB_HEIGHT)], [TAB_HEIGHT, kHeight], Extrapolate.CLAMP);
    const bottomz = interpolate(translateY.value, [0, -(kHeight - TAB_HEIGHT)], [TAB_HEIGHT, 0], Extrapolate.CLAMP);
    return {
      bottom: bottomz,
      height: heightz
    };
  });

  const pangestureStyle = useAnimatedStyle(() => {
    const heightz = interpolate(translateY.value, [0, -(kHeight - TAB_HEIGHT)], [0, TAB_HEIGHT], Extrapolate.CLAMP);
    return {
      height: heightz
    }
  })

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, context) => {
      // Lưu giá trị ban đầu khi bắt đầu kéo
      context.startY = translateY.value;
      cancelAnimation(translateY);
    },
    onActive: (event, context) => {
      translateY.value = context.startY + event.translationY;
    },
    onEnd: (event) => {
      runOnJS(onEndDrag)();
    },
  });

  return (
    <Animated.View style={[styles.floatingPlayer, animatedStyle]}>
      <ScrollView style={{ flex: 1, overflow: 'hidden' }}>
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={[{ height: 0, backgroundColor: 'black', width: '100%', }, pangestureStyle]} />
        </PanGestureHandler>
        <Pressable onPress={toggleFullScreen}>
          <Text style={{ color: 'red' }}>{position}</Text>
          <Text style={{ color: 'red' }}>
            {'Full Screen'}
          </Text>
        </Pressable>
      </ScrollView>
    </Animated.View>
  )
}

const HomeTab = () => {

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
        tabBar={(props) => (
          <View>
            <FloatingPlayer />
            <TabBar {...props} />
          </View>
        )}
      >
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
  floatingPlayer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
    width: '100%',
    backgroundColor: 'white'
  },
});
export default HomeTab;