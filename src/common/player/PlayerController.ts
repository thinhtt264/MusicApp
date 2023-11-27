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

import {
  fetchAudioSagaAction,
  playerControlActionSaga,
} from 'src/store/action-saga';
import { PlayerProps } from './Type';

const ANDROID_HEAD_PATH = 'file://';

export const startAudio = async (info: PlayerProps, signal?: AbortSignal) => {
  await TrackPlayer.reset();
  await dispatch(
    playerControlActionSaga.setCurrentTrack({ PlayerProps: info }),
  );

  await dispatch(
    fetchAudioSagaAction.fetch({
      callback: async TrackInfo => {
        if (typeof TrackInfo === 'string') return;
        await addPlaylist(TrackInfo);
      },
    }),
  );

};

export const startPlaylist = async (queue: TrackDataFields[]) => {
  await TrackPlayer.reset();
  await dispatch(playerActions.onResetQueue(queue));
  await startAudio({ from: 'queue', info: queue[0] });
  await TrackPlayer.setPlayWhenReady(true);
};

/**
 * Function to handle track switching
 * @param options - 'next' or 'previous' option
 */
export const onSwitchTrack = async (options: 'next' | 'previous') => {
  await dispatch(
    playerControlActionSaga.onChangeCurrentTrack({
      ChangeTrackProps: {
        option: options,
        callback: async TrackInfo => {
          if (typeof TrackInfo === 'string') return;
          await addPlaylist(TrackInfo);
          await skipToNext(TrackInfo);
        },
      },
    }),
  );
};

const skipToNext = async (TrackInfo: any) => {
  const currentQueue = await TrackPlayer.getQueue();
  if (TrackInfo.id === currentQueue[0].id) {
    await TrackPlayer.skip(0);
  } else {
    await TrackPlayer.skipToNext();
  }
  await TrackPlayer.setPlayWhenReady(true);
};

export const addPlaylist = async (info: TrackDataFields) => {
  const { playUrl, trackName, trackId, artistName } = formatSearchData(info);
  const addTrack = {
    id: trackId,
    url: playUrl,
    title: trackName,
    artist: artistName,
  };

  const currentQueue = await TrackPlayer.getQueue();
  const isAlready = currentQueue.find(item => item.id === trackId);

  if (!isAlready) {
    await TrackPlayer.add(addTrack);
  } else {
    return;
  }
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
