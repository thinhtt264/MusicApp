import { SearchDataItemFields } from './Search';

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
  tracks: {
    items: SearchDataItemFields[];
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
