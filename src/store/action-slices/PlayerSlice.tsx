import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TrackDataFields, TrackDataItemFields } from 'src/models/Track';
import { appInit, getRecommend } from '../action-thunk';
import { GetRecommendResponseFields } from 'src/models/Api';

interface PlayerState {
  currentTrack: TrackDataFields;
  trackQueue: TrackDataItemFields[];
}

const DEFAULT_INFO = {
  url: '',
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
    onSetCurrentTrack: (state, { payload }: PayloadAction<any>) => {
      if (state.currentTrack.id === payload.id) return;
      state.currentTrack = { ...state.currentTrack, ...payload };
    },
    onRemoveCurrentTrack: (
      state,
      { payload }: PayloadAction<TrackDataFields>,
    ) => {
      if (state.currentTrack.url === payload.url)
        state.currentTrack = DEFAULT_INFO;
    },
    onResetQueue: (state, { payload }: PayloadAction<any>) => {
      state.trackQueue = [];

      if (Array.isArray(payload)) {
        state.trackQueue = payload;
      } else {
        state.trackQueue.push(payload);
      }
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
        } else if ( // nếu là bài hát cuối trong playlist bấm next sẽ reset playlist
          payload.option === 'next' &&
          trackIndex === state.trackQueue.length - 1
        ) {
          state.currentTrack = state.trackQueue[0];
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
        //update playfrom cho list recommend
        const updatedTracks = payload.tracks.map(track => ({
          ...track,
          playFrom: 'recommend',
        }));
        state.trackQueue = [state.currentTrack, ...updatedTracks];
      },
    );
    builder.addCase(appInit.fulfilled, state => {
      state.trackQueue = [state.currentTrack];
    });
  },
});
export const { reducer: playerReducer, actions: playerActions } = playerSlice;
