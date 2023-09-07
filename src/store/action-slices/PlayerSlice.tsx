import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TrackDataFields } from 'src/models/Search';

interface PlayerState {
  currentTrack: TrackDataFields;
}

const DEFAULT_INFO = {
  url: `file://`,
  artists: [],
  external_urls: { spotify: '' },
};

const initialState: PlayerState = {
  currentTrack: DEFAULT_INFO,
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    onSetCurrentTrack: (state, { payload }: PayloadAction<TrackDataFields>) => {
      if (state.currentTrack.url !== payload.url)
        state.currentTrack = { ...state.currentTrack, ...payload };
    },
    onRemoveCurrentTrack: (
      state,
      { payload }: PayloadAction<TrackDataFields>,
    ) => {
      if (state.currentTrack.url === payload.url)
        state.currentTrack = DEFAULT_INFO;
    },
  },
  extraReducers: builder => {},
});
export const { reducer: playerReducer, actions: playerActions } = playerSlice;
