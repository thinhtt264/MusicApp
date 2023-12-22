import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getArtistData } from '../action-thunk';
import { ArtistState } from 'src/models/Artist';

const initialState: ArtistState = {
  artistData: {} as any,
};

const artistSlice = createSlice({
  name: 'artist',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getArtistData.fulfilled, (state, action) => {
      state.artistData = action.payload;
    });
  },
});
export const { reducer: artistReducer, actions: artistActions } = artistSlice;
