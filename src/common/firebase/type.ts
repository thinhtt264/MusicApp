export interface ReadDataProps {
  collection?: 'TrackList' | 'UserInfo';
  doc: string;
}

export interface WriteDataProps {
  collection?: 'TrackList' | 'UserInfo';
  data: TrackInfoFields;
}

export interface TrackInfoFields {
  id: string;
  url: string;
  title: string;
  artist: string;
}

export interface UploadFileFields {
  localFilePath: string;
  data: TrackInfoFields;
}
