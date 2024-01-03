import { createSlice } from '@reduxjs/toolkit';
import { getAlbumData, getSeveralArtists } from '../action-thunk';
import { AlbumState } from 'src/models/Album';

const initialState: AlbumState = {
  albumData: {} as any,
};

const alBumSlice = createSlice({
  name: 'album',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAlbumData.fulfilled, (state, action) => {
      state.albumData = action.payload;
    });
    builder.addCase(getSeveralArtists.fulfilled, (state, action) => {
      state.albumData = {
        ...state.albumData,
        artists: action.payload.artists as any,
      };
    });
  },
});
export const { reducer: alBumReducer, actions: AlbumActions } = alBumSlice;
