import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getSearchData } from '../action-thunk';
import {
  GetSearchDataResponseFields,
  GetSearchRecentDataFields,
} from 'src/models/Api';
import { isOnlyWhitespace } from 'src/common/regex';

export type FilterParams = 'track' | 'artist';
export interface SearchStateType {
  searchData: GetSearchDataResponseFields;
  searchRecentData: GetSearchRecentDataFields;
  selectedFilter: FilterParams;
}
const initialState: SearchStateType = {
  searchData: {
    keyword: '',
    offset: 0,
    artists: {
      items: [],
      next: '',
      offset: 0,
      previous: '',
      total: 0,
    },
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
    lists: {
      items: [],
      next: '',
      offset: 0,
      previous: '',
      total: 0,
    },
  },
  selectedFilter: 'track',
};

const searchSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setKeyword: (state, { payload }: PayloadAction<string>) => {
      state.searchData.keyword = payload;
    },
    onSetFilter: (state, { payload }: PayloadAction<any>) => {
      state.selectedFilter = payload;
    },
    addSearchRecentList: (state, { payload }) => {
      const type = payload?.type === 'track' ? 'tracks' : 'artists';
      const existingIndex = state.searchRecentData.lists.items.findIndex(
        item => item.id === payload.id,
      );

      if (existingIndex === -1) {
        state.searchRecentData.lists.items.unshift({ ...payload, type: type });
        state.searchRecentData.lists.total += 1;
      }
    },

    removeSearchRecentList: (state, { payload }) => {
      const indexToRemove = state.searchRecentData.lists.items.findIndex(
        item => item.id === payload,
      );

      if (indexToRemove !== -1) {
        state.searchRecentData.lists.items.splice(indexToRemove, 1);
        state.searchRecentData.lists.total -= 1;
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
        if (state.selectedFilter === 'track') {
          state.searchData.tracks = {
            ...state.searchData.tracks,
            items: [...state.searchData.tracks.items, ...payload.tracks.items],
          };
        } else if (state.selectedFilter === 'artist') {
          state.searchData.artists = {
            ...state.searchData.artists,
            items: [
              ...state.searchData.artists.items,
              ...payload.artists.items,
            ],
          };
        }
      }
    });
  },
});

export const { reducer: searchReducer, actions: searchActions } = searchSlice;
