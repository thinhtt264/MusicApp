import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getFeaturedPlaylist, getHomePlaylist, getSearchData } from '../action-thunk';
import { GetSearchDataResponseFields, HomeDataItemFields } from 'src/models/Api';
import { uniqBy } from 'lodash';
export interface HomeStateType {
  homedata: {
    items: HomeDataItemFields[];
    total: number;
  };
  playlist: {
    items: HomeDataItemFields[];
    total: number;
  };
  searchData: GetSearchDataResponseFields;
}
const initialState: HomeStateType = {
  homedata: {
    items: [],
    total: 0,
  },
  playlist: {
    items: [],
    total: 0,
  },
  searchData: {
    tracks: {
      items: [],
      next: '',
      offset: 0,
      previous: '',
      total: 0
    }
  },
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getHomePlaylist.fulfilled, (state, action) => {
      const { items, total, offset } = action.payload.playlists;
      if (offset === 0) {
        state.homedata.items = items;
        state.homedata.total = total;
      } else {
        const uniqueItems = uniqBy(items, 'item.id');
        state.homedata.items = [...state.homedata.items, ...uniqueItems];
      }
    });
    builder.addCase(getFeaturedPlaylist.fulfilled, (state, action) => {
      const { items, total } = action.payload.playlists;
      state.playlist.items = items;
      state.playlist.total = total;
    });
    builder.addCase(getSearchData.fulfilled, (state, action) => {
      state.searchData = action.payload
    })
  },
});
export const { reducer: homeReducer, actions: homeActions } = homeSlice;
