import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ProfileState } from 'src/models/App';
import { TrackDataFields } from 'src/models/Track';

const initialState: ProfileState = {
  loveQueue: [],
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    onAddLoveQueue: (state, { payload }: PayloadAction<TrackDataFields>) => {
      const findIndex = state.loveQueue.findIndex(i => i.id === payload.id);
      if (findIndex === -1) {
        state.loveQueue = [...state.loveQueue, payload];
      }
    },
  },
  extraReducers: builder => {},
});
export const { reducer: profileReducer, actions: profileActions } =
  profileSlice;
