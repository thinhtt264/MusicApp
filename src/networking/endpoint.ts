const endpoints = {
  auth: {
    token: 'api/token',
    search: 'v1/search?q=remaster%2520track%3A$keyword&type=$type',
    otpVerify: 'api/otp/$uid/verify',
  },
  home: {
    getPlaylist:
      'v1/browse/featured-playlists?country=VN&timestamp=2023-10-23T00%3A00%3A00',
  },
};
export { endpoints };
