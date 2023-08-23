const endpoints = {
  auth: {
    token: 'api/token',
    search: 'v1/search?q=remaster%2520track%3A$keyword&type=$type',
    otpVerify: 'api/otp/$uid/verify',
  },
  home: {
    getPlaylist:
      'v1/browse/categories/$type_id/playlists?country=VN',
  },
};
export { endpoints };
