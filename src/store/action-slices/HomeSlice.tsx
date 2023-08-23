import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getHomePlaylist } from '../action-thunk';
import { HomeDataItemFields } from 'src/models/Api';

export interface HomeStateType {
  homedata: {
    items: HomeDataItemFields[];
    total: number;
  };
}
const initialState: HomeStateType = {
  homedata: {
    items: [],
    total: 0,
  },
};
const homeSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getHomePlaylist.fulfilled, (state, action) => {      
      const { items, total } = action.payload.playlists;
      state.homedata.items = items;
      state.homedata.total = total;
    });
  },
});
export const { reducer: homeReducer, actions: homeActions } = homeSlice;
