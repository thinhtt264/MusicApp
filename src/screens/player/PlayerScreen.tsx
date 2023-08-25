import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { useScreenController } from 'src/common/hooks';
import { getDownloadLink } from 'src/store/action-thunk';
import { useAppSelector } from 'src/common/redux';

const PlayerScreen = ({ route }: any) => {
  const { trackUrl } = route?.params;
  const { dispatch, navigation, translate } = useScreenController();
  const { env } = useAppSelector(state => state.app);

  useEffect(() => {
    dispatch(
      getDownloadLink({ link: trackUrl, baseUrl: env?.DOWNLOAD_URL ?? '' }),
    );
  }, [trackUrl]);

  return (
    <View>
      <Text>PlayerScreen</Text>
    </View>
  );
};

export default PlayerScreen;

const styles = StyleSheet.create({});
