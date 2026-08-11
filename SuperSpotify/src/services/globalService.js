

const fetchFromGlobalApi = async (endpoint) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}${endpoint}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Global API Error: ${response.statusText}`);
  }

  return response.json();
};

export const globalService = {
  getGlobalPlaylist: async () => {
    return fetchFromGlobalApi("/global/playlist/5ABHKGoOzxkaa28ttQV9sE?offset=5&limit=5");
  },

  getGlobalAlbumPlaylist: async () => {
    const response = await fetchFromGlobalApi("/global/playlist/5ABHKGoOzxkaa28ttQV9sE?offset=5&limit=5");
    console.log("Global Album Playlist Response:", response);
    return fetchFromGlobalApi("/global/playlist/5ABHKGoOzxkaa28ttQV9sE?limit=5");
  },

  getNewReleases: async () => {
    return fetchFromGlobalApi("/global/new-releases");
  },

  // Dynamic catalog queries
  getPlaylist: async (id) => {
    return fetchFromGlobalApi(`/global/playlist/${id}`);
  },

  getArtist: async (id) => {
    return fetchFromGlobalApi(`/global/artist/${id}`);
  },

  getArtistSongs: async (id) => {
    return fetchFromGlobalApi(`/global/artist/${id}/top-tracks`);
  },

  getArtistAlbums: async (id) => {
    return fetchFromGlobalApi(`/global/artist/${id}/albums`);
  },

  getArtistRelatedArtists: async (id) => {
    return fetchFromGlobalApi(`/global/artist/${id}/related`);
  },

  getAlbum: async (id) => {
    return fetchFromGlobalApi(`/global/album/${id}`);
  }
};