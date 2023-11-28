import { call, put, take, takeLatest } from 'redux-saga/effects';
import { playerActions, searchActions } from '../action-slices';
import { createAction } from '@reduxjs/toolkit';
import { ChangeTrackProps, PlayerProps } from 'src/common/player/Type';
import { selector } from 'src/common/redux';
import TrackPlayer, { Event } from 'react-native-track-player';
import { fetchAudioSagaAction } from './FetchAudioSaga';
import { TrackDataItemFields } from 'src/models/Track';
import { getRecommend } from './api';

export function* setCurrentTrackWorker(
  action: ReturnType<typeof playerControlActionSaga.setCurrentTrack>,
): Generator<any> {
  const { from, info } = action.payload.PlayerProps;
  const trackInfo = { ...info, playFrom: from };

  yield put(playerActions.onSetCurrentTrack(trackInfo));
  if (from === 'search') {
    yield put(playerActions.onResetQueue(trackInfo));
    yield put(searchActions.addSearchRecentList(trackInfo));
  } else if (from === 'playlist') {
    yield put(playerActions.onResetQueue(trackInfo));
  }
}

export function* onChangeCurrentTrackWorker(
  action: ReturnType<typeof playerControlActionSaga.onChangeCurrentTrack>,
): Generator<any> {
  const { option, callback } = action.payload?.ChangeTrackProps;
  const currentTrack: any = yield selector(state => state.player.currentTrack);

  const res: any = yield TrackPlayer.getPlaybackState();
  if (res.state === 'loading' || res.state === 'buffering') {
    return;
  }

  const result = yield handleChangeCurrentTrackInQueue({
    currentTrack,
    option: option,
  });
  const { newTrack, newTrackQueue } = result as any;

  if (Object.keys(newTrack).length !== 0) {
    yield call(TrackPlayer.pause);
    yield put(playerActions.onResetQueue(newTrackQueue)) // set lại list recommend
    yield put(playerActions.onSetCurrentTrack(newTrack)); // chuyển track để fetch nhạc mới
    //check xem currentTrack có thay đổi hay không
    if (option === 'next') {
      yield put(
        fetchAudioSagaAction.fetch({
          callback: TrackInfo => {
            callback(TrackInfo);
          },
        }),
      );
    } else {
      yield TrackPlayer.skipToPrevious();
      yield TrackPlayer.setPlayWhenReady(true);
    }
  } else {
  }
}

function* handleChangeCurrentTrackInQueue({
  currentTrack,
  option,
}: {
  currentTrack: any;
  option: 'next' | 'previous';
}): Generator<any, any, any> {
  const trackQueue: any = yield selector(state => state.player.trackQueue);
  let newTrack = {};
  let newTrackQueue = trackQueue;

  if (trackQueue.length === 1) {
    //nếu không phát từ playlist thì sẽ auto get recommend
    const response = yield call(getRecommend, {
      artists: currentTrack?.artists[0]?.id ?? '',
      tracks: currentTrack?.id ?? '',
    });
    newTrackQueue = [currentTrack, ...response.tracks];
  }

  const trackIdToFind = currentTrack.id;
  const trackIndex = newTrackQueue.findIndex(
    (track: any) => track.id === trackIdToFind,
  );

  if (trackIndex !== -1) {
    if (option === 'next' && trackIndex < newTrackQueue.length - 1) {
      newTrack = newTrackQueue[trackIndex + 1];
    } else if (
      // nếu là bài hát cuối trong playlist bấm next sẽ reset playlist
      option === 'next' &&
      trackIndex === newTrackQueue.length - 1
    ) {
      newTrack = newTrackQueue[0];
    } else if (option === 'previous' && trackIndex > 0) {
      newTrack = newTrackQueue[trackIndex - 1];
    }
  }
  return { newTrack, newTrackQueue };
}

const setCurrentTrack = createAction<{ PlayerProps: PlayerProps }>(
  'player/setCurrentTrack',
);

const onChangeCurrentTrack = createAction<{
  ChangeTrackProps: ChangeTrackProps;
}>('player/onChangeCurrentTrackSaga');

export const playerControlActionSaga = {
  setCurrentTrack,
  onChangeCurrentTrack,
};

export function* playerSaga() {
  yield takeLatest(setCurrentTrack.type, setCurrentTrackWorker);
  yield takeLatest(onChangeCurrentTrack.type, onChangeCurrentTrackWorker);
}
