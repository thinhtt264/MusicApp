import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getSearchData } from '../action-thunk';
import { GetSearchDataResponseFields } from 'src/models/Api';
import { uniqBy } from 'lodash';
import { isOnlyWhitespace } from 'src/common/regex';
import { TrackDataFields } from 'src/models/Search';

export interface SearchStateType {
  searchData: GetSearchDataResponseFields;
  searchRecentData: GetSearchDataResponseFields;
}
const initialState: SearchStateType = {
  searchData: {
    keyword: '',
    offset: 0,
    tracks: {
      items: [],
      next: '',
      offset: 0,
      previous: '',
      total: 0,
    },
  },
  searchRecentData: {
    keyword: '',
    tracks: {
      items: [],
      next: '',
      offset: 0,
      previous: '',
      total: 0,
    },
  },
};

const searchSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setKeyword: (state, { payload }: PayloadAction<string>) => {
      state.searchData.keyword = payload;
    },

    addSearchRecentList: (
      state,
      { payload }: PayloadAction<TrackDataFields>,
    ) => {
      const existingIndex = state.searchRecentData.tracks.items.findIndex(
        item => item.id === payload.id,
      );

      if (existingIndex === -1) {
        state.searchRecentData.tracks.items.unshift(payload);
        state.searchRecentData.tracks.total += 1;
      }
    },

    removeSearchRecentList: (state, { payload }) => {
      const indexToRemove = state.searchRecentData.tracks.items.findIndex(
        item => item.id === payload,
      );

      if (indexToRemove !== -1) {
        state.searchRecentData.tracks.items.splice(indexToRemove, 1);
        state.searchRecentData.tracks.total -= 1;
      }
    },
  },

  extraReducers: builder => {
    builder.addCase(getSearchData.fulfilled, (state, { payload }) => {
      if (
        payload.keyword === '' ||
        isOnlyWhitespace(payload.keyword) ||
        state.searchData.keyword === ''
      ) {
        state.searchData = initialState.searchData;
        return;
      }

      if (payload.offset === 0) {
        state.searchData = payload;
      } else {
        state.searchData.tracks.items = [
          ...state.searchData.tracks.items,
          ...payload.tracks.items,
        ];
      }
    });
  },
});

export const { reducer: searchReducer, actions: searchActions } = searchSlice;