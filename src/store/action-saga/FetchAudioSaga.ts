import { call, put, delay, takeLatest } from 'redux-saga/effects';
import { createAction } from '@reduxjs/toolkit';
import { TrackDataFields } from 'src/models/Track';
import { NetWorkService } from 'src/networking/RestFulApi';
import { selector } from 'src/common/redux';
import { playerActions } from '../action-slices';
import { downloadTrack } from 'src/common/player';
import { deleteAllKey } from 'src/common/storage';

function* fetchAudioWorker(
  action: ReturnType<typeof fetchAudioSagaAction.fetch>,
): Generator<any> {
  const env: any = yield selector(state => state.app.env);
  const TrackInfo: any = yield selector(state => state.player.currentTrack);

  const fetchApi = () =>
    NetWorkService.Get({
      url: `?track=${TrackInfo.external_urls.spotify}`,
      baseUrl: env?.DOWNLOAD_URL ?? '',
      isNeedToken: false,
    });

  try {
    const trackFilePath = yield call(downloadTrack, TrackInfo);
    console.log(trackFilePath);

    if (trackFilePath) {
      const TrackInfoWithUrl = {
        ...TrackInfo,
        url: trackFilePath,
      };
      yield put(playerActions.onSetCurrentTrack(TrackInfoWithUrl));
      action.payload.callback?.(TrackInfoWithUrl);
    } else {
      const response: any = yield call(fetchApi);

      if (response && response?.soundcloudTrack?.audio[0]?.url) {
        const TrackInfoWithUrl = {
          ...TrackInfo,
          url: response.soundcloudTrack.audio[0].url,
        };

        yield delay(500);
        yield put(playerActions.onSetCurrentTrack(TrackInfoWithUrl));
        action.payload.callback?.(TrackInfoWithUrl);
        console.log('bị cc j mà qua zo dây');
        yield call(downloadTrack, TrackInfoWithUrl);
      }
    }
  } catch (e) {
    if (e === 'The key has expired') {
      alert('Hết key rồi thay key mới đê');
      action.payload.callback?.(e);
    } else {
      console.log(e);
    }
  }
}

const fetch = createAction<{
  callback: (TrackInfo: TrackDataFields | string) => void;
}>('fetch/fetchAudio');
export const fetchAudioSagaAction = { fetch };

export function* fetchSaga() {
  yield takeLatest(fetch.type, fetchAudioWorker);
}
