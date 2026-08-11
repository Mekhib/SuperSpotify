import { playerService } from "../services/playerService";

/**
 * Universal media play handler for Songs, Albums, and Playlists
 * @param {Object|string} item - The clicked track object, album object, or Spotify URI
 * @param {Object} [options] - Optional settings 
 */
export const playMedia = async (item, options = {}) => {
  if (!item) return;

  try {
    if (typeof item === "string") {
      if (item.includes(":album:") || item.includes(":playlist:")) {
        return await playerService.play({ context_uri: item });
      }
      return await playerService.play({ uris: [item.startsWith("spotify:") ? item : `spotify:track:${item}`] });
    }

    const type = item.type || (item.uri?.includes(":album:") ? "album" : item.uri?.includes(":playlist:") ? "playlist" : "track");

    if (type === "album" || type === "playlist") {
      const payload = {
        context_uri: item.uri || `spotify:${type}:${item.id}`,
      };
      if (options.trackIndex !== undefined) {
        payload.offset = { position: options.trackIndex };
      }
      return await playerService.play(payload);
    }

    if (options.trackList && Array.isArray(options.trackList)) {
      const uris = options.trackList.map((t) => (t.track || t).uri).filter(Boolean);
      return await playerService.play({
        uris,
        offset: { position: options.trackIndex || 0 },
      });
    }

    // Single track playback
    const trackUri = item.uri || (item.id ? `spotify:track:${item.id}` : null);
    if (trackUri) {
      await playerService.play({ uris: [trackUri] });
    }
  } catch (error) {
    console.error("Playback error:", error);
  }
};