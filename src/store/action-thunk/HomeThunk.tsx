import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  GetHomePlaylistFields,
  GetHomePlaylistResponseFields,
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
  const response = await NetWorkService.Get<GetSearchDataResponseFields>({
    url: endpoints.home.search
      .replace('$keyword', fields.keyword.toString())
      .replace('$type', fields.type.toString()),
  });
  console.log(response);
  return response;
});
