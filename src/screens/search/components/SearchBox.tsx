import { StyleSheet, View } from 'react-native';
import React, { memo, useRef } from 'react';
import isEqual from 'react-fast-compare';
import Colors from 'src/themes/Colors';
import Octicons from 'react-native-vector-icons/Octicons';
import { scale } from 'src/common/scale';
import { Input } from 'src/components/input';
import { debounce } from 'lodash';
import { useScreenController } from 'src/common/hooks';
import { getSearchData } from 'src/store/action-thunk';

interface Props {}

const SearchBoxComponent = (props: Props) => {
  const { dispatch, navigation, translate } = useScreenController();
  const inputRef = useRef(null);

  const debouncedSearch = debounce(query => {
    dispatch(
      getSearchData({
        keyword: query,
        type: 'track',
      }),
    );
  }, 300);

  const onChangeTextValue = (value: any) => {
    debouncedSearch(value);
  };

  return (
    <View style={styles.container}>
      <Input
        onChangeTextValue={onChangeTextValue}
        ref={inputRef}
        contentLeft={() => (
          <Octicons name="search" color={'black'} size={scale(20)} />
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
  textHolder: {
    color: Colors.black.default,
    marginLeft: scale(10),
    textAlignVertical: 'center',
    padding: 0,
    margin: 0,
    width: '85%',
  },
});
