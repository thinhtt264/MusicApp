import { Ref, RefObject } from 'react';
import { FlatListProps } from 'react-native';

export interface LoadMoreListProps<T> extends AnimatedListProps<T> {
  totalPages: number;
  // page: number;
  // handleLoadMore: Function;
  // refresh: boolean;
  // handleRefresh: Function;
  onGetData: (pageNumber: number) => void;
}

export interface AnimatedListProps<T> extends FlatListProps<any> {
  data: T[];
  renderHeader?: any;
  renderFooter?: any;
  renderItem: any;
  flatlistRef?: RefObject<any>;
}
