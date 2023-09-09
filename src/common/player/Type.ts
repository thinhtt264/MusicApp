import { TrackDataFields } from 'src/models/Track';

export interface PlayerProps {
  from: 'search' | 'home';
  info: TrackDataFields;
}
