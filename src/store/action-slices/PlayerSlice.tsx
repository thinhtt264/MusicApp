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
      if (Object.keys(payload).length !== 0) state.currentTrack = payload;      
    },
  },
  extraReducers: builder => {
    builder.addCase(
      getRecommend.fulfilled,
      (state, { payload }: PayloadAction<GetRecommendResponseFields>) => {
        console.log('work nè hehe');
        
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
