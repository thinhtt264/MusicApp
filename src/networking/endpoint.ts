const endpoints = {
  auth: {
    token: 'api/token',
  },
  home: {
    getPlaylist: 'v1/browse/categories/$type_id/playlists?country=VN',
    getFeaturedPlaylist:
      'v1/browse/featured-playlists?country=VN&locale=sv_SV&limit=50',
    search: 'v1/search?q=track%3A$keyword&type=$type&limit=10&offset=$offset',
  },
};
export { endpoints };
