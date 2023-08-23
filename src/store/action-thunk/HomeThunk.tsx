import { createAsyncThunk } from '@reduxjs/toolkit';
import { CATEGORY_ID } from 'src/common/api';
import {
  GetHomePlaylistFields,
  GetHomePlaylistResponseFields,
} from 'src/models/Api';
import { NetWorkService } from 'src/networking/RestFulApi';
import { endpoints } from 'src/networking/endpoint';

export const getHomePlaylist = createAsyncThunk<
  GetHomePlaylistResponseFields,
  GetHomePlaylistFields
>('home/getPlaylist', async fields => {
  const response = await NetWorkService.Get<GetHomePlaylistResponseFields>({
    url: endpoints.home.getPlaylist.replace(
      '$type_id',
      CATEGORY_ID.VietNamMusic.toString(),
    ),
    body: fields,
  });
  console.log(response);
  return response;
});
