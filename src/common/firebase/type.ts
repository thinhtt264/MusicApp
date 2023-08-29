export interface ReadDataProps {
  collection?: 'TrackList' | 'UserInfo';
  doc: string;
}

export interface WriteDataProps extends ReadDataProps {
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
