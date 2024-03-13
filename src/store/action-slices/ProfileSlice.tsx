import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ProfileState } from 'src/models/App';

const initialState: ProfileState = {
  loveQueue: [],
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
  },
  extraReducers: builder => {},
});
export const { reducer: profileReducer, actions: profileActions } =
  profileSlice;
