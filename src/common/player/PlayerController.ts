import TrackPlayer, { Track } from 'react-native-track-player';
import { downloadTrack } from './TrackDownloader';
import {
  add,
  getActiveTrackIndex,
  remove,
  setQueue,
} from 'react-native-track-player/lib/trackPlayer';

export const startAudio = async (downloadUrl: string) => {
  await TrackPlayer.reset();

  const filePath = await downloadTrack(downloadUrl);
  // Add a track to the queue
  await TrackPlayer.add({
    id: 'trackId',
    url: `file://${filePath}`,
    title: 'Track Title',
    artist: 'Track Artist',
  });

  // Start playing it
  await TrackPlayer.play();
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
