import { createSlice } from '@reduxjs/toolkit';
import { getArtistAblum, getArtistData } from '../action-thunk';
import { ArtistState } from 'src/models/Artist';

const initialState: ArtistState = {
  artistData: {} as any,
  artistAlbum: {} as any,
};

const artistSlice = createSlice({
  name: 'artist',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getArtistData.fulfilled, (state, action) => {
      state.artistData = action.payload;
    });
    builder.addCase(getArtistAblum.fulfilled, (state, { payload }) => {
      if (payload.offset === 0) {
        state.artistAlbum = payload;
      } else {
        state.artistAlbum = {
          ...state.artistAlbum,
          items: [...state.artistAlbum.items, ...payload.items],
        };
      }
    });
  },
});
export const { reducer: artistReducer, actions: artistActions } = artistSlice;
