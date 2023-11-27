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
      DOWNLOAD_URL:
        'https://spotify-scraper.p.rapidapi.com/v1/track/download/soundcloud',
      RAPID_API_KEY: '2f02633218mshdf13b1dd33255a8p1febdfjsn5d5e8132ac32',
      RAPID_API_HOST: 'spotify-scraper.p.rapidapi.com',
      APP_ENV: 'Dev',
      CODE_PUSH_KEY_ANDROID: 'rNoapnOG0dgNLNTl_jFRcm_RiykWU9rm1L_LS',
      CODE_PUSH_KEY_IOS: 'GPZYASdJNN4dHGYI-5ikiDIdwX6m1xy9uKIZp',
      GOOGLE_IOS:
        '211231497701-49r8vknsjd4fflovsen8gecsufsjo0ae.apps.googleusercontent.com',
      GOOGLE_WED:
        '211231497701-4c4qh1gle00lh2k2g67bc9mhb53t107b.apps.googleusercontent.com',
      CLIENT_ID: '9ebf1326555f474e8e49a2eba0350278',
      CLIENT_SECRET: 'd2bd2c1558ca4105a59484d29d92e95a',
    },
    Prod: {
      API_URL: 'https://api.spotify.com/',
      AUTH_URL: 'https://accounts.spotify.com/',
      DOWNLOAD_URL: 'https://api.spotify-downloader.com/',
      APP_ENV: 'Prod',
      CODE_PUSH_KEY_ANDROID: 'kiDtdgIE1bb4yYO2HWgAhxtHbY4I5XogGlgOA',
      CODE_PUSH_KEY_IOS: 'GPZYASdJNN4dHGYI-5ikiDIdwX6m1xy9uKIZp',
      GOOGLE_IOS:
        '211231497701-49r8vknsjd4fflovsen8gecsufsjo0ae.apps.googleusercontent.com',
      GOOGLE_WED:
        '211231497701-4c4qh1gle00lh2k2g67bc9mhb53t107b.apps.googleusercontent.com',
      CLIENT_ID: '9ebf1326555f474e8e49a2eba0350278',
      CLIENT_SECRET: 'd2bd2c1558ca4105a59484d29d92e95a',
    },
  };
  return config[env];
};

export const envFlex = (env: string) => ENVDynamic(env);
