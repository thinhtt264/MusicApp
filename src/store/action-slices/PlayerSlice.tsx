import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TrackDataFields, TrackDataItemFields } from 'src/models/Track';
import { getRecommend } from '../action-thunk';
import { GetRecommendResponseFields } from 'src/models/Api';

interface PlayerState {
  currentTrack: TrackDataFields;
  trackQueue: TrackDataItemFields[];
}

const DEFAULT_INFO = {
  url: `file://`,
  artists: [],
  external_urls: { spotify: '' },
};

const initialState: PlayerState = {
  currentTrack: DEFAULT_INFO,
  trackQueue: [],
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    onSetCurrentTrack: (state, { payload }: PayloadAction<TrackDataFields>) => {
      if (state.currentTrack.url === payload.url) return;
      state.currentTrack = { ...state.currentTrack, ...payload };
    },
    onRemoveCurrentTrack: (
      state,
      { payload }: PayloadAction<TrackDataFields>,
    ) => {
      if (state.currentTrack.url === payload.url)
        state.currentTrack = DEFAULT_INFO;
    },
    onChangeCurrentTrack: (state, { payload }) => {
      const trackIdToFind = payload.id;
      const trackIndex = state.trackQueue.findIndex(
        track => track.id === trackIdToFind,
      );

      if (trackIndex !== -1) {
        if (
          payload.option === 'next' &&
          trackIndex < state.trackQueue.length - 1
        ) {
          state.currentTrack = state.trackQueue[trackIndex + 1];
        } else if (payload.option === 'previous' && trackIndex > 0) {
          state.currentTrack = state.trackQueue[trackIndex - 1];
        }
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(
      getRecommend.fulfilled,
      (state, { payload }: PayloadAction<GetRecommendResponseFields>) => {
        state.trackQueue = [state.currentTrack, ...payload.tracks];
        console.log(state.trackQueue);
        
      },
    );
  },
});
export const { reducer: playerReducer, actions: playerActions } = playerSlice;
