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
    builder.addCase(getArtistAblum.fulfilled, (state, action) => {
      state.artistAlbum = action.payload;
    });
  },
});
export const { reducer: artistReducer, actions: artistActions } = artistSlice;
