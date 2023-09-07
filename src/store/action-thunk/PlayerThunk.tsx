import { createAsyncThunk } from '@reduxjs/toolkit';
import { getRecommendFields, getRecommendResponseFields } from 'src/models/Api';
import { NetWorkService } from 'src/networking/RestFulApi';
import { endpoints } from 'src/networking/endpoint';

export const getRecommend = createAsyncThunk<
  getRecommendResponseFields,
  getRecommendFields
>('player/getRecommend', async fields => {
  const response = await NetWorkService.Get<getRecommendResponseFields>({
    url: endpoints.player.getRecommend
      .replace('$tracks', fields.tracks.toString())
      .replace('$artists', fields.artists.toString()),
  });

  // console.log(response);
  return response;
});
