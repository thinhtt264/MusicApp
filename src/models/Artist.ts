interface ExternalUrls {
  spotify: string;
}

interface Followers {
  href: null | any; // Để phù hợp với giá trị null trong JSON
  total: number;
}

interface Image {
  height: number;
  url: string;
  width: number;
}

export interface ArtistDataItemFields {
  external_urls: ExternalUrls;
  followers: Followers;
  genres: string[];
  href: string;
  id: string;
  images: Image[];
  name: string;
  popularity?: number;
  type?: string;
  uri?: string;
}
