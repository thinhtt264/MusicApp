import { put, takeLatest } from 'redux-saga/effects';
import { playerActions, searchActions } from '../action-slices';
import { createAction } from '@reduxjs/toolkit';
import { PlayerProps } from 'src/common/player/Type';

function* setCurrentTrackWorker(
  action: ReturnType<typeof setCurrentTrackSagaAction.fetch>,
): Generator<any> {
  const { from, info } = action.payload.PlayerProps;

  yield put(playerActions.onSetCurrentTrack(info));
  if (from === 'search') {
    yield put(playerActions.onResetQueue(info));
    yield put(searchActions.addSearchRecentList(info));
  } else {
  }
}

const fetch = createAction<{ PlayerProps: PlayerProps }>(
  'player/setCurrentTrack',
);
export const setCurrentTrackSagaAction = { fetch };

export function* playerSaga() {
  yield takeLatest(fetch.type, setCurrentTrackWorker);
}
