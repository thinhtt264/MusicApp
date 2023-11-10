import { put, takeLatest } from 'redux-saga/effects';
import { playerActions, searchActions } from '../action-slices';
import { createAction } from '@reduxjs/toolkit';
import { PlayerProps } from 'src/common/player/Type';

export function* setCurrentTrackWorker(
  action: ReturnType<typeof setCurrentTrackSagaAction.fetch>,
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

const fetch = createAction<{ PlayerProps: PlayerProps }>(
  'player/setCurrentTrack',
);
export const setCurrentTrackSagaAction = { fetch };

export function* playerSaga() {
  yield takeLatest(fetch.type, setCurrentTrackWorker);
}
