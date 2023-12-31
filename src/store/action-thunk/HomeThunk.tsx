import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  GetHomePlaylistFields,
  GetHomePlaylistResponseFields,
  GetLinkDownLoadFields,
  GetLinkDownLoadResponseFields,
  GetSearchDataFields,
  GetSearchDataResponseFields,
} from 'src/models/Api';
import { NetWorkService } from 'src/networking/RestFulApi';
import { endpoints } from 'src/networking/endpoint';

export const getHomePlaylist = createAsyncThunk<
  GetHomePlaylistResponseFields,
  GetHomePlaylistFields
>('home/getHomePlaylist', async fields => {
  const response = await NetWorkService.Get<GetHomePlaylistResponseFields>({
    url: endpoints.home.getPlaylist.replace(
      '$type_id',
      fields.category_id.toString(),
    ),
  });
  console.log(response);
  return response;
});

export const getFeaturedPlaylist =
  createAsyncThunk<GetHomePlaylistResponseFields>(
    'home/getFeaturedPlaylist',
    async fields => {
      const response = await NetWorkService.Get<GetHomePlaylistResponseFields>({
        url: endpoints.home.getFeaturedPlaylist,
      });
      console.log(response);
      return response;
    },
  );

export const getSearchData = createAsyncThunk<
  GetSearchDataResponseFields,
  GetSearchDataFields
>('home/getSearchData', async fields => {
  const url = endpoints.home.search
    .replace(/\$keyword/g, fields.keyword.toString())
    .replace(/\$type/g, fields.type.toString())
    .replace('$offset', fields.offset.toString());

  const response = await NetWorkService.Get<GetSearchDataResponseFields>({
    url: url,
  });

  return {
    ...response,
    keyword: fields.keyword.toString(),
    offset: fields.offset,
  };
});

export const getDownloadLink = createAsyncThunk<
  GetLinkDownLoadResponseFields,
  GetLinkDownLoadFields
>('home/getDownloadLink', async fields => {
  try {
    const response = await NetWorkService.Get<GetLinkDownLoadResponseFields>({
      url: `?track=${fields.link}`,
      baseUrl: fields.baseUrl,
      isNeedToken: false,
    });

    console.log(response);
    return response;
  } catch (e) {
    console.log(e);
    throw e;
  }
});
