import { PlayFromState, TrackDataFields } from 'src/models/Track';

export interface PlayerProps {
  from: PlayFromState;
  info: TrackDataFields;
}
