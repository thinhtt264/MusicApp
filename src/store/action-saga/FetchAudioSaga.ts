import { takeLeading, call, put, select, delay } from 'redux-saga/effects';
import { createAction } from '@reduxjs/toolkit';
import { TrackDataFields } from 'src/models/Track';
import { getTrackInfo } from 'src/common/firebase';
import { NetWorkService } from 'src/networking/RestFulApi';
import { selector } from 'src/common/redux';
import { playerActions } from '../action-slices';

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

  const trackResponse: any = yield call(getTrackInfo, { doc: TrackInfo.id });

  if (trackResponse._data !== undefined) {
    console.log('phát từ firebase');
    action.payload.callback?.(trackResponse._data);
    put(playerActions.onSetCurrentTrack(trackResponse._data));
  } else {
    const response: any = yield call(fetchApi);

    if (response && response?.soundcloudTrack?.audio[0]?.url) {
      const TrackInfoWithUrl = {
        ...TrackInfo,
        url: response.soundcloudTrack.audio[0].url,
      };

      yield delay(500);
      put(playerActions.onSetCurrentTrack(TrackInfoWithUrl));
      action.payload.callback?.(TrackInfoWithUrl);
    }
  }
}

const fetch = createAction<{ callback: (TrackInfo: TrackDataFields) => void }>(
  'fetch/fetchAudio',
);
export const fetchAudioSagaAction = { fetch };

export function* fetchSaga() {
  yield takeLeading(fetch.type, fetchAudioWorker);
}
