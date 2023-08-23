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

export interface GetHomePlaylistFields {}

export interface GetHomePlaylistResponseFields {
  playlists: { items: HomeDataItemFields[]; total: number };
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
