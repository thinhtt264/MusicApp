import React, { memo, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import equals from 'react-fast-compare';
import { Blurhash } from 'react-native-blurhash';
import FastImage, { OnLoadEvent } from 'react-native-fast-image';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import { useSharedTransition } from 'src/common/animated';
import { onCheckType } from 'src/common/helper/method/Type';
import { useAsyncState, useMounted } from 'src/common/hooks/customHook';

import { ImageProps } from './type';

const ImageComponent = ({
  style: styleOverride = {},
  source,
  blurHashOnLoad = 'L4A1CcV[00tltR#mRQB.00of{zRj',
  thumbBlurHash,
  resizeMode = 'cover',
  containerStyle,
  childrenError,
  childrenOnload,
  onLoad,
  onLoadStart,
  onError,
  ...rest
}: ImageProps) => {
  // state

  const [loadSucceeded, setLoadSucceeded] = useState<boolean>(false);
  const [loadThumbSucceeded, setLoadThumbSucceeded] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const opacityImg = useSharedTransition(loadSucceeded);
  const opacityBlur = useSharedTransition(loadThumbSucceeded);
  const opacityOnLoad = useSharedTransition(!loadThumbSucceeded);

  // function
  const onLoadImageStart = () => {
    setError(false);
    if (onCheckType(onLoadStart, 'function')) {
      onLoadStart();
    }
  };

  const onLoadThumbSucceeded = () => {
    setLoadThumbSucceeded(true);
  };

  const onLoadImageSucceeded = (event: OnLoadEvent) => {
    setTimeout(() => {
      setError(false);
      setLoadSucceeded(true);
    }, 200);
    if (onCheckType(onLoad, 'function')) {
      onLoad(event);
    }
  };

  const onLoadError = () => {
    setError(true);
    if (onCheckType(onError, 'function')) {
      onError();
    }
  };

  // reanimated style
  const imageStyle = useAnimatedStyle(() => ({
    opacity: opacityImg.value,
  }));

  const imageOnloadStyle = useAnimatedStyle(() => ({
    opacity: opacityOnLoad.value,
  }));
  const imageBlurStyle = useAnimatedStyle(() => ({
    opacity: opacityBlur.value,
  }));

  // render
  return (
    <View style={[containerStyle]}>
      <Animated.View style={[styles.viewOnLoad, imageOnloadStyle]}>
        {childrenOnload || (
          <Blurhash
            blurhash={thumbBlurHash ?? blurHashOnLoad}
            style={[StyleSheet.absoluteFillObject]}
          />
        )}
      </Animated.View>
      <Animated.View style={[StyleSheet.absoluteFillObject, imageBlurStyle]}>
        <Animated.View style={[StyleSheet.absoluteFillObject]}>
          {thumbBlurHash !== undefined && (
            <Blurhash
              onLoadEnd={onLoadThumbSucceeded}
              blurhash={thumbBlurHash ?? blurHashOnLoad}
              style={[StyleSheet.absoluteFillObject]}
            />
          )}
        </Animated.View>
      </Animated.View>
      <Animated.View style={[StyleSheet.absoluteFillObject, imageStyle]}>
        <FastImage
          {...rest}
          onLoadStart={onLoadImageStart}
          resizeMode={resizeMode}
          onError={onLoadError}
          onLoad={onLoadImageSucceeded}
          style={[styles.img, styleOverride]}
          source={
            onCheckType(source, 'string')
              ? { uri: source as string }
              : (source as number | Record<string, unknown>)
          }
        />
      </Animated.View>
      {error && (
        <Animated.View style={[styles.viewError]}>
          {childrenError}
        </Animated.View>
      )}
    </View>
  );
};
export const AnimatedImage = memo((props: ImageProps) => {
  const [isChange, setIsChange] = useAsyncState<boolean>(false);

  useMounted(() => {
    setIsChange(true, () => {
      setIsChange(false);
    });
  }, [props.source]);

  return isChange ? null : <ImageComponent {...props} />;
}, equals);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    flex: 1,
  },
  viewError: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#bbb',
  },
  viewOnLoad: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#bbb',
  },
});
