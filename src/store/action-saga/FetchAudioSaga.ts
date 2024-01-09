import { call, put, delay, takeLatest, race, take } from 'redux-saga/effects';
import { createAction } from '@reduxjs/toolkit';
import { TrackDataFields } from 'src/models/Track';
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

  try {
    const { trackFilePath, cancel }: any = yield race({
      trackFilePath: call(downloadTrack, TrackInfo),
      cancel: take(fetchAudioSagaAction.fetch),
    });

    if (cancel) {
      // user gọi bài khác trước khi bài đó được tải xong
      return;
    }

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

      if (response && response?.youtubeVideo?.audio[0]?.url) {
        const TrackInfoWithUrl = {
          ...TrackInfo,
          url: response.youtubeVideo.audio[0].url,
        };

        yield delay(500);
        yield put(playerActions.onSetCurrentTrack(TrackInfoWithUrl));
        action.payload.callback?.(TrackInfoWithUrl);
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
