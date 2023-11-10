interface ExternalUrls {
  spotify: string;
}

interface Album {
  album_type: string;
  artists: any[]; // You can define an interface for artists if needed
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: [{ url: string }]; // You can define an interface for images if needed
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}

interface Artist {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

interface ExternalIds {
  isrc: string;
}
export type PlayFromState =
  | 'home'
  | 'search'
  | 'recommend'
  | 'playlist'
  | 'queue';

export interface TrackDataFields extends TrackDataItemFields {
  url?: string;
  playFrom?: PlayFromState;
}

export interface TrackDataItemFields {
  album?: Album;
  artists: Artist[];
  available_markets?: string[];
  disc_number?: number;
  duration_ms?: number;
  explicit?: boolean;
  external_ids?: ExternalIds;
  external_urls: ExternalUrls;
  href?: string;
  id?: string;
  is_local?: boolean;
  name?: string;
  popularity?: number;
  preview_url?: string;
  track_number?: number;
  type?: string;
  uri?: string;
}
