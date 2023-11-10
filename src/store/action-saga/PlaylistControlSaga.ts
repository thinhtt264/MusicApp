import { put, takeLatest } from 'redux-saga/effects';
import { createAction } from '@reduxjs/toolkit';
import { PlayerProps } from 'src/common/player/Type';

export function* addPlayListWorker(
  action: ReturnType<typeof addPlayListSagaAction.fetch>,
): Generator<any> {
  const { from, info } = action.payload.PlayerProps;
  
  
}

const fetch = createAction<{ PlayerProps: PlayerProps }>(
  'playlist/addPlayList',
);
export const addPlayListSagaAction = { fetch };

export function* playlistSaga() {
  yield takeLatest(fetch.type, addPlayListWorker);
}
