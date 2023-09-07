import TrackPlayer, { Track } from 'react-native-track-player';
import {
  add,
  getActiveTrackIndex,
  remove,
  setQueue,
} from 'react-native-track-player/lib/trackPlayer';
import { TrackInfoFields } from '../firebase/type';
import { dispatch, getState } from '../redux';
import { formatSearchData, playerActions } from 'src/store/action-slices';
import { TrackDataFields } from 'src/models/Track';

const ANDROID_HEAD_PATH = 'file://';

export const startAudio = async ({
  info,
}: {
  info: TrackDataFields | false;
}) => {
  await TrackPlayer.reset();
  const { currentTrack } = getState('player');
  const TrackInfo = info || currentTrack;

  // const filePath = await downloadTrack(downloadUrl, info); //Tải nhac

  // if (filePath) {
  //   await addPlaylist({
  //     ...info,
  //     url: `${ANDROID_HEAD_PATH}${filePath}`,
  //   });
  // } else {
  await addPlaylist(TrackInfo);
  // }

  // Start playing it
  await TrackPlayer.setPlayWhenReady(true);
  if (TrackInfo.url !== currentTrack.url) {
    console.log('set current track');
    dispatch(playerActions.onSetCurrentTrack(TrackInfo));
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
