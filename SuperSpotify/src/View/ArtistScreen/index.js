import {globalService} from "../../services/globalService";

export const artistAPI = {

getFullArtistProfile: async (id) => {
    try {
      return await globalService.getArtist(id);
    } catch (err) {
      console.error("Dashboard failed to load full artist profile:", err);
      return null;
    }
  },

  getArtists: async (id) => {
    try {
      return await globalService.getArtist(id);
    } catch (err) {
      console.error("Dashboard failed to load  artists:", err);
      return null;
    }
  },

  getArtistSongs: async (id) => {
    try {
      return await globalService.getArtistSongs(id);
    } catch (err) {
      console.error("Dashboard failed to load artist songs:", err);
      return null;
    }
  },

  getArtistAlbums: async (id) => {
    try {
      return await globalService.getArtistAlbums(id); 
    } catch (err) {
      console.error("Dashboard failed to load artist albums:", err);
      return null;
    }
  },

  getRelatedArtists: async (id) => {
    try {
      return await globalService.getArtistRelatedArtists(id);
    } catch (err) {
      console.error("Dashboard failed to load related artists:", err);
      return null;
    }
  },

 

}