import {userService} from "../../services/userService";
import {globalService} from "../../services/globalService";

export const albumScreenApi = {
 
getAlbum: async (id) => {
    try {
      return await globalService.getAlbum(id);
    } catch (err) {
      console.error("Failed to load album:", err);
      return null;
    }
  }

}