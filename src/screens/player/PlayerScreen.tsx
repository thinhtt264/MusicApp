import { Platform, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useScreenController } from 'src/common/hooks';
import { getDownloadLink } from 'src/store/action-thunk';
import { useAppSelector } from 'src/common/redux';
import { Header } from './components';
import { Blurhash } from 'react-native-blurhash';
import { StatusBar } from 'react-native';
import { kWidth } from 'src/common/constants';
import FastImage from 'react-native-fast-image';
import { scale } from 'src/common/scale';
import { startAudio } from 'src/common/player';
import { LoadingScreen } from '../loading/LoadingScreen';
import { useFocusEffect } from '@react-navigation/native';
import { ProgressBar } from './components';

const PlayerScreen = ({ route }: any) => {
  const { trackUrl, name, bgColor, image } = route?.params;
  const { dispatch, navigation } = useScreenController();
  const { env } = useAppSelector(state => state.app);

  const [isLoading, setLoading] = useState(true);

  const fetchAndStartAudio = async () => {
    // const response = await dispatch(
    //   getDownloadLink({ link: trackUrl, baseUrl: env?.DOWNLOAD_URL ?? '' }),
    // ).unwrap();
    setLoading(false);
    await startAudio('response.audio.url');
  };

  useEffect(() => {
    fetchAndStartAudio();
  }, []);

  const onGoBack = () => navigation.goBack();

  useFocusEffect(
    useCallback(() => {
      Platform.OS === 'android' && StatusBar.setBackgroundColor('transparent');
      StatusBar.setTranslucent(true);
    }, []),
  )
  return isLoading ? (
    <LoadingScreen />
  ) : (
    <View style={styles.container}>
      <Blurhash
        blurhash={bgColor}
        style={{
          height: '100%',
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: -1,
        }}
      />
      <Header title={name} LeftIcon onLeftPress={onGoBack} />
      <FastImage
        source={{ uri: image }}
        style={styles.image}
        resizeMode="stretch"
      />
      <ProgressBar style={styles.progessBar} />
    </View>
  );
};

export default PlayerScreen;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center' },
  image: {
    height: kWidth - scale(70),
    width: kWidth - scale(70),
    marginTop: scale(30),
    borderRadius: scale(4),
  },
  progessBar: {
    height: scale(50),
    width: kWidth - scale(70),
  }
});
