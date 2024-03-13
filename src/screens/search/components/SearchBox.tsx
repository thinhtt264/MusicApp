/* eslint-disable react/no-unstable-nested-components */
import { StyleSheet, View } from 'react-native';
import React, { memo } from 'react';
import isEqual from 'react-fast-compare';
import Colors from 'src/themes/Colors';
import Octicons from 'react-native-vector-icons/Octicons';
import { scale } from 'src/common/scale';
import { Input } from 'src/components/input';
import { debounce } from 'lodash';
import { useScreenController } from 'src/common/hooks';
import { searchActions } from 'src/store/action-slices';
import { hasNotch } from 'react-native-device-info';

interface Props {
  onGetData: (query: string) => void;
}
const SearchBoxComponent = ({ onGetData }: Props) => {
  const { translate, dispatch } = useScreenController();

  const debouncedSearch = debounce((query: string) => {
    dispatch(searchActions.setKeyword(query));
    onGetData(query);
  }, 300);

  const onChangeTextValue = (value: any) => {
    debouncedSearch(value);
  };

  return (
    <View style={styles.container}>
      <Input
        style={styles.inputStyle}
        onChangeTextValue={onChangeTextValue}
        placeholder={translate('search:placeholder')}
        placeholderTextColor={'black'}
        contentLeft={() => (
          <Octicons name="search" color={'black'} size={scale(18)} />
        )}
        defaultValue=""
      />
    </View>
  );
};

export const SearchBox = memo(SearchBoxComponent, isEqual);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white.default,
    borderRadius: scale(5),
    paddingHorizontal: scale(10),
  },
  inputStyle: {
    paddingVertical: scale(hasNotch() ? 10 : 5),
  },
});
