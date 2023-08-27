import TrackPlayer from 'react-native-track-player';
import { downloadTrack } from './TrackDownloader';

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
