import TrackPlayer, { Track } from 'react-native-track-player';
import {
  add,
  getActiveTrackIndex,
  remove,
  setQueue,
} from 'react-native-track-player/lib/trackPlayer';
import { dispatch } from '../redux';
import { formatSearchData, playerActions } from 'src/store/action-slices';
import { TrackDataFields } from 'src/models/Track';
import { downloadTrack } from './TrackDownloader';
import { getTrackInfo } from '../firebase';
import { getDownloadLink } from 'src/store/action-thunk';
import { envFlex } from '../config/env';
import { fetchAudioSagaAction } from 'src/store/action-saga';
import { PlayerProps } from './Type';
import { setCurrentTrackSagaAction } from 'src/store/action-saga/PlayerControlSaga';

const ANDROID_HEAD_PATH = 'file://';

export const startAudio = async (info: PlayerProps) => {
  await TrackPlayer.reset();
  dispatch(setCurrentTrackSagaAction.fetch({ PlayerProps: info }));

  dispatch(
    fetchAudioSagaAction.fetch({
      callback: async TrackInfo => {
        await addPlaylist(TrackInfo);
      },
    }),
  );
  // }
  // Start playing it
  // await TrackPlayer.setPlayWhenReady(true);
};

export const onSwitchTrack = async (options: 'next' | 'previous') => {
  if (options === 'next') {
    TrackPlayer.pause();
    dispatch(
      fetchAudioSagaAction.fetch({
        callback: async TrackInfo => {
          await addPlaylist(TrackInfo);
          TrackPlayer.skipToNext();
          TrackPlayer.play();
        },
      }),
    );
  } else {
    TrackPlayer.skipToPrevious();
  }
};

const fetchAudio = async ({
  info,
  env,
}: {
  info: TrackDataFields;
  env?: any;
}) => {
  let TrackInfo = info ?? {};
  const trackResponse: any = await getTrackInfo({ doc: TrackInfo.id });

  if (trackResponse._data !== undefined) {
    console.log('phát từ firebase');
    TrackInfo = trackResponse._data;
    return TrackInfo;
  } else {
    const response = await dispatch(
      getDownloadLink({
        link: TrackInfo.external_urls.spotify,
        baseUrl: env?.DOWNLOAD_URL ?? envFlex('Dev')?.DOWNLOAD_URL,
      }),
    );

    TrackInfo = {
      ...TrackInfo,
      url: response.payload.soundcloudTrack.audio[0].url,
    };
    downloadTrack(TrackInfo);
    return TrackInfo;
  }
};

export const addPlaylist = async (info: TrackDataFields) => {
  const { playUrl, trackName, trackId, artistName } = formatSearchData(info);
  // Add a track to the queue
  await TrackPlayer.add({
    id: trackId,
    url: playUrl,
    title: trackName,
    artist: artistName,
  });
};

export async function shuffle(): Promise<Track[]> {
  const currentQueue = await TrackPlayer.getQueue();
  const shuffledQueue = [...currentQueue].sort(() => Math.random() - 0.5);
  await setQueueUninterrupted(shuffledQueue);
  return currentQueue;
}

/**
 * This is a combination of removePreviousTracks() and removeUpcomingTracks().
 * To set the player's queue without playback interruption, remove
 * all tracks with remove() that are not the activeTrackIndex. The current
 * track will be automatically shifted to the first element. Then, splice tracks that
 * the currentTrack is at the first element, and add the spliced tracks.
 * @param tracks
 */
export async function setQueueUninterrupted(tracks: Track[]): Promise<void> {
  // if no currentTrack, its a simple setQueue
  const currentTrackIndex = await getActiveTrackIndex();
  console.debug(
    'setQueueUninterrupted: currentTrackIndex is valid? ',
    currentTrackIndex,
  );
  if (currentTrackIndex === undefined) return await setQueue(tracks);
  // if currentTrack is not in tracks, its a simple setQueue
  const currentQueue = await TrackPlayer.getQueue();
  const currentTrack = currentQueue[currentTrackIndex];
  const currentTrackNewIndex = tracks.findIndex(
    // define conditions to find the currentTrack in tracks
    track => track.url === currentTrack.url,
  );
  console.debug(
    'setQueueUninterrupted: currentTrackIndex is present? ',
    currentTrackNewIndex,
    tracks,
    currentTrack,
  );
  if (currentTrackNewIndex < 0) return await setQueue(tracks);
  // else, splice that all others are removed, new track list spliced
  // that the currentTrack becomes the first element.
  // eslint-disable-next-line prefer-const
  let removeTrackIndices = [...Array(currentQueue.length).keys()];
  removeTrackIndices.splice(currentTrackIndex, 1);
  await remove(removeTrackIndices);
  const splicedTracks = tracks
    .slice(currentTrackNewIndex + 1)
    .concat(tracks.slice(0, currentTrackNewIndex));
  console.debug('edited tracks', splicedTracks);
  await add(splicedTracks);
}
