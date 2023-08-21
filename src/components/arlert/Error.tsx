export const ERROR_NETWORK_CODE = -100;

const handleData = (responseError: any) => {
  return responseError;
};

export const handleErrorApi = (status: number, data: any) => {
  if (data === null) {
    return handleData({
      code: ERROR_NETWORK_CODE,
      msg: 'error:haveError',
      data: null,
      status: false,
    });
  }

  switch (status) {
    case ERROR_NETWORK_CODE:
      return handleData({
        code: ERROR_NETWORK_CODE,
        msg: 'error:haveError',
        data: null,
        status: false,
      });
    case 400:
      return handleData({
        code: status,
        msg: 'auth:loginfail',
        data: null,
        status: false,
      });
    case 401:
      return handleData({
        code: status,
        msg: data.message,
        data: null,
        status: false,
      });
    case 402:
      return handleData({
        code: status,
        msg: data.message,
        data: null,
        status: false,
      });
    case 403:
      return handleData({
        code: status,
        msg: data.message,
        data: null,
        status: false,
      });
    case 404:
      return handleData({
        code: status,
        msg: data.message,
        data: null,
        status: false,
      });
    case 405:
      return handleData({
        code: status,
        msg: data.message,
        data: null,
        status: false,
      });
    case 406:
      return handleData({
        code: status,
        msg: data.message,
        data: null,
        status: false,
      });
    case 407:
      return handleData({
        code: status,
        msg: data.message,
        data: null,
        status: false,
      });
    case 408:
      return handleData({
        code: status,
        msg: data.message,
        data: null,
        status: false,
      });
    case 500:
      return handleData({
        code: status,
        msg: data.message,
        data: null,
        status: false,
      });
    case 501:
      return handleData({
        code: status,
        msg: data.message,
        data: null,
        status: false,
      });
    case 502:
      return handleData({
        code: status,
        msg: data.message,
        data: null,
        status: false,
      });
    case 503:
      return handleData({
        code: status,
        msg: data.message,
        data: null,
        status: false,
      });
    case 504:
      return handleData({
        code: status,
        msg: data.message,
        data: null,
        status: false,
      });
    case 505:
      return handleData({
        code: status,
        msg: data.message,
        data: null,
        status: false,
      });

    default:
      return handleData({
        code: status,
        msg: data.message,
        data: null,
        status: false,
      });
  }
};
