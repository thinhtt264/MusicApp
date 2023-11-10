import { fork, all } from 'redux-saga/effects';
import { fetchSaga, playerSaga, playlistSaga } from './action-saga';

function* rootSaga() {
  yield all([fork(fetchSaga), fork(playerSaga), fork(playlistSaga)]);
}

export default rootSaga;
