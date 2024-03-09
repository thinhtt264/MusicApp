export interface ENVFields {
  API_URL?: string;
  APP_ENV?: string;
  AUTH_URL?: string;
  DOWNLOAD_URL?: string;
  CODE_PUSH_KEY_ANDROID?: string;
  CODE_PUSH_KEY_IOS?: string;
  GOOGLE_IOS?: string;
  GOOGLE_WED?: string;
  CLIENT_ID?: string;
  CLIENT_SECRET?: string;
  RAPID_API_KEY?: string;
  RAPID_API_HOST?: string;
}

export const ENVDynamic = (env: string) => {
  const config: any = {
    Dev: {
      API_URL: 'https://api.spotify.com/',
      AUTH_URL: 'https://accounts.spotify.com/',
      DOWNLOAD_URL: 'https://spotify-scraper.p.rapidapi.com/v1/track/download',
      RAPID_API_KEY: 'Your X-RapidAPI-Key',
      RAPID_API_HOST: 'Your X-RapidAPI-Host',
      APP_ENV: 'Dev',
      CODE_PUSH_KEY_ANDROID: '----',
      CODE_PUSH_KEY_IOS: '----',
      GOOGLE_IOS: '----',
      GOOGLE_WED: '----',
      CLIENT_ID: '9ebf1326555f474e8e49a2eba0350278',
      CLIENT_SECRET: 'd2bd2c1558ca4105a59484d29d92e95a',
    },
  };
  return config[env];
};

export const envFlex = (env: string) => ENVDynamic(env);
