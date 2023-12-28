import { AlbumDataItemFields, AlbumState } from './Album';
import { ArtistDataField, ArtistDataItemFields } from './Artist';
import { TrackDataItemFields } from './Track';

export interface ResponseBase<T = any> {
  code: number;

  msg?: string | undefined | null;

  data?: T;

  status: boolean;
}

export interface ParamsNetwork {
  isNeedToken?: boolean;
  url: string;
  params?: any;
  query?: any;
  body?: any;
  baseUrl?: string;
}

export interface GetHomePlaylistFields {
  category_id: number | string;
}

export interface GetHomePlaylistResponseFields {
  playlists: { items: HomeDataItemFields[]; total: number; offset: number };
}
export interface HomeDataItemFields {
  item: {
    images: [
      {
        url: string;
      },
    ];
    description: string;
    href: string;
    id: string;
    name: string;
    snapshot_id: string;
    collaborative: boolean;
  };
}

export interface GetSearchDataFields {
  keyword: string;
  type: string;
  offset: number;
}
export interface GetSearchDataResponseFields {
  offset?: number;
  keyword: string;
  artists: {
    items: ArtistDataItemFields[];
    next: string;
    offset: number;
    previous: string;
    total: number;
  };
  tracks: {
    items: TrackDataItemFields[];
    next: string;
    offset: number;
    previous: string;
    total: number;
  };
}

export interface GetSearchRecentDataFields {
  offset?: number;
  keyword: string;
  lists: {
    items: any[];
    next: string;
    offset: number;
    previous: string;
    total: number;
  };
}

export interface GetLinkDownLoadFields {
  baseUrl: string;
  link: string;
}

export interface GetLinkDownLoadResponseFields {
  soundcloudTrack: {
    title: string;
    audio: [
      {
        url: string;
        durationMs: number;
      },
    ];
  };
}

export interface GetRecommendFields {
  tracks: string | string[];
  artists: string | string[];
}

export interface GetRecommendResponseFields {
  tracks: TrackDataItemFields[];
}

export interface GetTopTracksFields {
  id: string;
  limit?: number;
  offset?: number;
}
export interface GetArtistInfoFields {
  id: string;
}
export interface GetArtistInfoResponseFields extends ArtistDataItemFields {}

export interface GetTopTracksResponseFields extends ArtistDataField {}

export interface getAlBumResponseFields extends AlbumDataItemFields {}
