

const fetchFromUserApi = async (endpoint) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}${endpoint}`, {
    method: "GET",
    credentials: "include", 
    headers: {
      "Content-Type": "application/json",
      // Add these headers to bypass the browser cache and force a 200 OK
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "Pragma": "no-cache"
    },
  });

  if (!response.ok) {
    throw new Error(`User API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

export const userService = {
  getMe: async () => {
    return fetchFromUserApi("/user/me");
  },

  getTopTracks: async () => {
    return fetchFromUserApi("/user/top-tracks");
  },

  getTopArtists: async () => {
    return fetchFromUserApi("/user/top-artists");
  },

  getUserPlaylists: async () => {
    return fetchFromUserApi("/user/playlists");
  },

  getRecentTracks: async (limit = 10) => {
    return fetchFromUserApi(`/user/recent-tracks?limit=${limit}`);
  },

getSavedTracks: async (limit = 50, offset = 0) => {
    return fetchFromUserApi(`/user/saved-tracks?limit=${limit}&offset=${offset}`);
  }
};