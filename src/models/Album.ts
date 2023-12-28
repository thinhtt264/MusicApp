import { ArtistDataItemFields } from './Artist';
import { TrackDataFields } from './Track';

type ExternalUrls = {
  spotify: string;
};

type Artist = {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
};

type Copyright = {
  text: string;
  type: string;
};

type Image = {
  height: number;
  url: string;
  width: number;
};

type ExternalIds = {
  upc: string;
};

export interface Album {
  album_type: string;
  total_tracks: number;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  type: string;
  uri: string;
  artists: ArtistDataItemFields[];
  album_group: string;
  is_playable: boolean;
}

export type AlbumDataItemFields = {
  album_type: string;
  artists: Artist[];
  copyrights: Copyright[];
  external_ids: ExternalIds;
  external_urls: ExternalUrls;
  genres: string[];
  href: string;
  id: string;
  images: Image[];
  is_playable: boolean;
  label: string;
  name: string;
  popularity: number;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  tracks: {
    href: string;
    items: TrackDataFields[];
    limit: number;
    next: null;
    offset: number;
    previous: null;
    total: number;
  };
  type: string;
  uri: string;
};

export interface AlbumState {
  albumData: AlbumDataItemFields;
}
