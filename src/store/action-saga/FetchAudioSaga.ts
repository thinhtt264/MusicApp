import { takeLeading, call, put, select, delay } from 'redux-saga/effects';
import { createAction } from '@reduxjs/toolkit';
import { TrackDataFields } from 'src/models/Track';
import { getTrackInfo } from 'src/common/firebase';
import { NetWorkService } from 'src/networking/RestFulApi';
import { selector } from 'src/common/redux';
import { playerActions } from '../action-slices';
import { downloadTrack } from 'src/common/player';

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

  const trackFormFirebase: any = yield call(getTrackInfo, {
    doc: TrackInfo.id,
  });

  if (trackFormFirebase._data !== undefined) {
    console.log('phát từ firebase');
    action.payload.callback?.(trackFormFirebase._data);
    put(playerActions.onSetCurrentTrack(trackFormFirebase._data));
  } else {
    try {
      const response: any = yield call(fetchApi);

      if (response && response?.soundcloudTrack?.audio[0]?.url) {
        const TrackInfoWithUrl = {
          ...TrackInfo,
          url: response.soundcloudTrack.audio[0].url,
        };

        yield delay(500);
        put(playerActions.onSetCurrentTrack(TrackInfoWithUrl));
        action.payload.callback?.(TrackInfoWithUrl);
        downloadTrack(TrackInfoWithUrl);
      }
    } catch (e) {
      if (e === 'The key has expired') {
        alert("Hết key rồi thay key mới đê")
        action.payload.callback?.(e);
      }
    }
  }
}

const fetch = createAction<{
  callback: (TrackInfo: TrackDataFields | string) => void;
}>('fetch/fetchAudio');
export const fetchAudioSagaAction = { fetch };

export function* fetchSaga() {
  yield takeLeading(fetch.type, fetchAudioWorker);
}
