import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  GetArtistInfoFields,
  GetArtistInfoResponseFields,
  GetSeveralArtistInfoFields,
  GetSeveralArtistInfoResponseFields,
  GetTopTracksFields,
  GetTopTracksResponseFields,
  getAlBumResponseFields,
  getPlaylistResponseFields,
} from 'src/models/Api';
import { NetWorkService } from 'src/networking/RestFulApi';
import { endpoints } from 'src/networking/endpoint';
interface ApiCall {
  key: string;
  url: string;
  id: string;
}

export const getArtistData = createAsyncThunk<
  GetTopTracksResponseFields,
  GetTopTracksFields
>('artist/getArtistData', async fields => {
  const apiCalls: ApiCall[] = [
    {
      key: 'topTracks',
      id: 'tracks',
      url: endpoints.artist.topTrack.replace('$id', fields.id.toString()),
    },
    {
      key: 'relatedArtist',
      id: 'artists',
      url: endpoints.artist.relatedArtist.replace('$id', fields.id.toString()),
    },
    {
      key: 'relatedAlbum',
      id: '',
      url: endpoints.artist.relatedAlbum.replace('$id', fields.id.toString()),
    },
    {
      key: 'artistAlbum',
      id: '',
      url: endpoints.artist.artistAlbum
        .replace('$id', fields.id.toString())
        .replace('$limit', fields.limit?.toString() ?? '10')
        .replace('$offset', fields.offset?.toString() ?? '0'),
    },
  ];

  const responses = await Promise.all(
    apiCalls.map(apiCall =>
      NetWorkService.Get<GetTopTracksResponseFields>({ url: apiCall.url }),
    ),
  );

  const formatData = apiCalls.reduce((result: any, apiCall, index) => {
    if (apiCall.key === 'topTracks') {
      result[apiCall.key] = responses[index][apiCall.id];
      return result;
    }
    result[apiCall.key] = apiCall.id
      ? responses[index][apiCall.id]
      : responses[index];
    return result;
  }, {});

  return { ...formatData, id: fields.id.toString() };
});

export const getArtistInfo = createAsyncThunk<
  GetArtistInfoResponseFields,
  GetArtistInfoFields
>('artist/getArtistInfo', async fields => {
  const response = await NetWorkService.Get<GetArtistInfoResponseFields>({
    url: endpoints.artist.getArtist.replace('$id', fields.id.toString()),
  });

  return response;
});

export const getSeveralArtists = createAsyncThunk<
  GetSeveralArtistInfoResponseFields,
  GetSeveralArtistInfoFields
>('artist/getSeveralArtists', async fields => {
  const idSperator = fields.ids.map(id => id.toString()).join('%2C');

  const response = await NetWorkService.Get<GetSeveralArtistInfoResponseFields>(
    {
      url: endpoints.artist.getSeveralArtists.replace('$ids', idSperator),
    },
  );

  return response;
});

export const getAlbumData = createAsyncThunk<
  getAlBumResponseFields,
  GetTopTracksFields
>('album/getAlbum', async fields => {
  const response = await NetWorkService.Get<getAlBumResponseFields>({
    url: endpoints.album.getAlbum.replace('$id', fields.id.toString()),
  });

  return { ...response, id: fields.id.toString() };
});

export const getPlaylistData = createAsyncThunk<
  getPlaylistResponseFields,
  GetTopTracksFields
>('playlist/getPlaylistData', async fields => {
  const response = await NetWorkService.Get<getPlaylistResponseFields>({
    url: endpoints.playlists.getPlaylist.replace('$id', fields.id.toString()),
  });

  return { ...response, id: fields.id.toString() };
});
