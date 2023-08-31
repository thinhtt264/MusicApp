import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  getFeaturedPlaylist,
  getHomePlaylist,
  getSearchData,
} from '../action-thunk';
import {
  GetSearchDataResponseFields,
  HomeDataItemFields,
} from 'src/models/Api';
import { uniqBy } from 'lodash';
import { isOnlyWhitespace } from 'src/common/regex';
import { TrackDataFields } from 'src/models/Search';
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

export const formatSearchData = (item: TrackDataFields) => {
  const albumImage = item?.album?.images[0]?.url;
  const trackName = item?.name ?? '';
  const trackId = item?.id;
  const artistName = item?.artists[0].name ?? '';
  const artist = item?.artists;
  const album = item?.album;
  const trackUrl = item?.external_urls.spotify;
  const playUrl = item?.url;

  return {
    albumImage,
    trackName,
    trackId,
    artistName,
    artist,
    album,
    trackUrl,
    playUrl,
  };
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
      if (
        action.payload.keyword === '' ||
        isOnlyWhitespace(action.payload.keyword)
      ) {
        state.searchData.tracks.items = [];
        return;
      }
      state.searchData = action.payload;
    });
  },
});
export const { reducer: homeReducer, actions: homeActions } = homeSlice;
