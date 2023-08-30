import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TrackInfoFields } from 'src/common/firebase/type';

interface PlayerState {
  currentTrack: TrackInfoFields;
}

const DEFAULT_INFO = {
  id: 'trackId',
  url: `file://`,
  title: 'Track Title',
  artist: 'Track Artist',
};

const initialState: PlayerState = {
  currentTrack: DEFAULT_INFO,
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    onSetCurrentTrack: (state, { payload }: PayloadAction<TrackInfoFields>) => {
      if (state.currentTrack.url !== payload.url) state.currentTrack = payload;
    },
  },
  extraReducers: builder => {},
});
export const { reducer: playerReducer, actions: playerActions } = playerSlice;
