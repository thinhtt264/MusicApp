import React, { useState, useCallback, useEffect } from 'react';
import { FlatList, StyleSheet, Keyboard } from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { LoadMoreListProps } from './type';
import { LoatMoreFooter } from '../loader';
import { ToTopButton } from '../button';

const AnimatedList = Animated.createAnimatedComponent(FlatList);

const LoadMoreList = React.forwardRef((props: LoadMoreListProps<any>, ref) => {
  const {
    data,
    renderItem,
    renderFooter = null,
    renderHeader,
    flatlistRef,
    totalPages,
    onGetData,
  } = props;

  const canMomentum = React.useRef(false);

  const [page, setPage] = useState<number>(0);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const translationY = useSharedValue(0);

  React.useImperativeHandle(ref, () => ({
    isLoadMore,
    refresh,
    page,
  }));

  const onBackToTop = useCallback((): void => {
    flatlistRef?.current?.scrollToOffset({ offset: 0, animated: true });
  }, []);

  const scrollHandler = useAnimatedScrollHandler(event => {
    translationY.value = event.contentOffset.y;
  });

  const handleLoadMore = () => {
    const currentPage = page + 10;
    if (currentPage > totalPages) {
      return;
    }
    handleGetData(currentPage);
    setPage(prev => prev + 10);
  };

  const handleRefresh = useCallback(async (): Promise<void> => {
    try {
      setRefresh(true);
      await handleGetData();
      setPage(0);
    } finally {
      setRefresh(false);
    }
  }, [onGetData]);

  const handleGetData = useCallback(async (pageNumber = 0): Promise<void> => {
    try {
      setIsLoadMore(true);
      onGetData(pageNumber);
    } finally {
      setTimeout(() => {
        setIsLoadMore(false);
      }, 200);
    }
  }, [onGetData]);

  return (
    <>
      <AnimatedList
        {...props}
        onScroll={scrollHandler}
        onScrollBeginDrag={Keyboard.dismiss}
        keyExtractor={(item, index) => index.toString()}
        ref={flatlistRef}
        data={data}
        renderItem={renderItem}
        removeClippedSubviews
        scrollEventThrottle={16}
        ListFooterComponent={
          renderFooter ?? <LoatMoreFooter totalPages={totalPages} page={page} />
        }
        {...(renderHeader && { ListHeaderComponent: renderHeader })}
        onRefresh={handleRefresh}
        refreshing={refresh}
        initialNumToRender={10}
        onMomentumScrollBegin={() => {
          canMomentum.current = false;
        }}
        onEndReached={() => {
          if (!canMomentum.current) {
            handleLoadMore();
            canMomentum.current = true;
          }
        }}
        onEndReachedThreshold={0.01}
      />
      <ToTopButton onPress={onBackToTop} translationY={translationY} />
    </>
  );
});

export default LoadMoreList;

const styles = StyleSheet.create({});
