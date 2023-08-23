import { ComponentType, Ref } from 'react';
import { FlatListProps } from 'react-native';

export interface LoadMoreListProps<T> extends AnimatedListProps<T> {
  totalPages: number;
  page: number;
  handleLoadMore: Function;
  refresh: boolean;
  handleRefresh: Function;
}

export interface AnimatedListProps<T> extends FlatListProps<any> {
  data: T[];
  renderHeader?: any;
  renderFooter?: any;
  renderItem: any;
  flatlistRef: Ref<any>;
}
