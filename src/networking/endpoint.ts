const endpoints = {
  auth: {
    token: 'api/token',
    otpVerify: 'api/otp/$uid/verify',
  },
  home: {
    getPlaylist: 'v1/browse/categories/$type_id/playlists?country=VN',
    getFeaturedPlaylist:
      'v1/browse/featured-playlists?country=VN&locale=sv_SV&limit=50',
    search:
      'v1/search?q=remaster%2520track%3A$keyword&type=$type&market=VN&limit=10',
  },
};
export { endpoints };
