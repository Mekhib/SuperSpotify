import { userService } from "../../services/userService";
import { globalService } from "../../services/globalService";

// Helper function to keep API calls DRY and allow errors (like 401s) to propagate
const handleApiCall = async (apiFunc, errorMessage) => {
  try {
    return await apiFunc();
  } catch (err) {
    console.error(errorMessage, err);
    throw err; 
  }
};



export const startAPI = {

  getTracks: () => handleApiCall(userService.getTopTracks, "Dashboard failed to load top tracks:"),
  getArtists: () => handleApiCall(userService.getTopArtists, "Dashboard failed to load top artists:"),
  getPlaylists: () => handleApiCall(userService.getUserPlaylists, "Dashboard failed to load user playlists:"),
  getGlobalSongs: () => handleApiCall(globalService.getGlobalPlaylist, "Dashboard failed to load global playlist:"),
  getGlobalAlbums: () => handleApiCall(globalService.getGlobalAlbumPlaylist, "Dashboard failed to load global albums:"),
  getNewReleases: () => handleApiCall(globalService.getNewReleases, "Dashboard failed to load new releases:"),
};