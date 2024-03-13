import { GetRecommendFields, GetRecommendResponseFields } from 'src/models/Api';
import { NetWorkService } from 'src/networking/RestFulApi';
import { endpoints } from 'src/networking/endpoint';

export const getRecommend = (fields: GetRecommendFields) =>
  NetWorkService.Get<GetRecommendResponseFields>({
    url: endpoints.player.getRecommend
      .replace('$tracks', fields.tracks.toString())
      .replace('$artists', fields.artists.toString()),
  });
