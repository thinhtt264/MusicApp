import { fork, all } from 'redux-saga/effects';
import { fetchSaga } from './action-saga';

function* rootSaga() {
  yield all([fork(fetchSaga)]);
}

export default rootSaga;
