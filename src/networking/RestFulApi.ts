import Axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import { ParamsNetwork, ResponseBase } from 'src/models/Api';
import { StyleSheet } from 'react-native';
import { TIME_OUT } from 'src/common/api';
import { endpoints } from './endpoint';
import { getState } from 'src/common/redux';
import { encode } from 'base-64';

const tokenKeyHeader = 'authorization';

const AxiosInstance = Axios.create({});

export const handleParameter = <T extends ParamsNetwork>(
  props: T,
  method: Method,
): AxiosRequestConfig & ParamsNetwork => {
  const { url, body, params, baseUrl, isNeedToken = true } = props;
  return {
    ...props,
    method,
    url,
    data: body,
    params,
    baseUrl,
    isNeedToken,
  };
};

// AxiosInstance.interceptors.response.use(
//   response => response,
//   async function (error) {
//     const originalRequest = error.config;
//     if (
//       error &&
//       error.response &&
//       error.response.status === 401 &&
//       originalRequest.url !== endpoints.auth.login &&
//       !originalRequest._retry
//     ) {
//       console.log('call refresh token');
//       originalRequest._retry = true;
//       const newToken: RefreshTokenResponseFields | null = await refreshToken();
//       if (newToken === null) {
//         return Promise.reject(error);
//       }
//       dispatch(authActions.onSetToken(newToken));
//       originalRequest.headers[
//         tokenKeyHeader
//       ] = `Bearer ${newToken.access_token}`;
//       return AxiosInstance(originalRequest);
//     }
//     return Promise.reject(error);
//   },
// );

// base
function Request<T = Record<string, unknown>>(
  config: AxiosRequestConfig & ParamsNetwork,
) {
  const { env } = getState('app');
  const { access_token } = getState('auth');

  console.log('endpoint: ', `${config.baseUrl}${config.url}`);

  const defaultConfig: AxiosRequestConfig = {
    baseURL: config.baseUrl ? config.baseUrl : env?.API_URL,
    timeout: TIME_OUT,
    headers: {
      'Content-Type': 'application/json',
      [tokenKeyHeader]:
        access_token && config.isNeedToken ? `Bearer ${access_token}` : '',
    },
  };

  return new Promise<T | any>((rs, rj) => {
    AxiosInstance.request(StyleSheet.flatten([defaultConfig, config]))
      .then((res: AxiosResponse<T>) => {
        const response = res.data;
        return rs(response);
      })
      .catch((error: any) => {
        let err;
        if (error && error.response) {
          err = error.response;
        } else {
          err = 'Network error';
        }
        // dispatch(appActions.onLoadAppEnd());

        if (
          config.url === endpoints.auth.token &&
          error.response?.status === 401 &&
          error.response?.data.message !== 'The refresh token is invalid.'
        ) {
          return rj(err);
        }
        // dispatch(
        //   appActions.onShowAlert({
        //     isShowAlert: true,
        //     error: err,
        //   }),
        // );
        // return rj(error);
      });
  });
}

// get
async function Get<T>(params: ParamsNetwork) {
  return Request<T>(handleParameter(params, 'GET'));
}

// post
async function Post<T>(params: ParamsNetwork) {
  return Request<T>(handleParameter(params, 'POST'));
}

type ParameterPostFormData = AxiosRequestConfig & ParamsNetwork;
// post FormData
async function PostFormData<T>(params: ParamsNetwork) {
  const { access_token } = getState('auth');
  const headers: AxiosRequestConfig['headers'] = {
    [tokenKeyHeader]:
      access_token && params.url !== 'oauth/token'
        ? `Bearer ${access_token}`
        : '',
    'Content-Type': 'multipart/form-data',
  };
  return Request<T>(
    handleParameter<ParameterPostFormData>({ ...params, headers }, 'POST'),
  );
}

// post FormUrlencoded
async function PostFormUrlencoded<T>(params: ParamsNetwork) {
  const { env } = getState('app');

  const credentials = `${env?.CLIENT_ID}:${env?.CLIENT_SECRET}`;
  const base64Credentials = encode(credentials);
  const authHeader = `Basic ${base64Credentials}`;

  const headers: AxiosRequestConfig['headers'] = {
    [tokenKeyHeader]: authHeader,
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  return Request<T>(
    handleParameter<ParameterPostFormData>({ ...params, headers }, 'POST'),
  );
}

// put
async function Put<T>(params: ParamsNetwork) {
  return Request<T>(handleParameter(params, 'PUT'));
}

// delete
async function Delete<T>(params: ParamsNetwork) {
  return Request<T>(handleParameter(params, 'DELETE'));
}
export type NetWorkResponseType<T> = (
  params: ParamsNetwork,
) => Promise<ResponseBase<T> | null>;

export const NetWorkService = {
  Get,
  Post,
  Put,
  Delete,
  PostFormData,
  Request,
  PostFormUrlencoded,
};
