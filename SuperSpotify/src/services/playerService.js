


const fetchFromPlayerApi = async (endpoint, method = "GET", body = null) => {
  const options = {
    method,
    credentials: "include", // Secures the request with your Express session
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${process.env.REACT_APP_API_URL}${endpoint}`, options);

  if (response.status === 204) {
    return { success: true };
  }

  if (!response.ok) {
    throw new Error(`Player API Error: ${response.statusText}`);
  }

  return response.json();
};

export const playerService = {
  getPlaybackState: async () => {
    return fetchFromPlayerApi("/player/state");
  },

  getLyrics: async (artist, track) => {
    if (!artist || !track) return { lyrics: null };
    
    try {
      const endpoint = `/player/lyrics?artist=${encodeURIComponent(artist)}&track=${encodeURIComponent(track)}`;
      return await fetchFromPlayerApi(endpoint);
    } catch (error) {
      console.warn("Failed to retrieve lyrics:", error);
      return { lyrics: null };
    }
  },

 play: async (payload) => {
    try {
      // 1. Attempt to play normally
      const response = await fetch("http://localhost:3001/player/play", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (response.ok) return;

      const errorText = await response.json();
      
      if (errorText.error && errorText.error.includes("device")) {
        console.warn("No active device found. Attempting to wake a device...");
        
        // Fetch available devices
        const deviceRes = await fetch("http://localhost:3001/player/devices");
        const deviceData = await deviceRes.json();
        
        if (deviceData.devices && deviceData.devices.length > 0) {
          // Grab the first available device (e.g., their smartphone or computer)
          const targetDeviceId = deviceData.devices[0].id;
          
          // 3. Retry the play command with the specific device ID
          await fetch(`http://localhost:3001/player/play?device_id=${targetDeviceId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
          });
        } else {
          // No devices exist at all. Prompt the user in the UI.
          alert("Please open Spotify on one of your devices first.");
        }
      }
    } catch (error) {
      console.error("Player service error:", error);
    }
  },

  pause: async () => {
    return fetchFromPlayerApi("/player/pause", "PUT");
  },

  next: async () => {
    return fetchFromPlayerApi("/player/next", "POST");
  },

  previous: async () => {
    return fetchFromPlayerApi("/player/previous", "POST");
  },

  
  setVolume: async (volumePercent) => {
    return fetchFromPlayerApi(`/player/volume?percent=${volumePercent}`, "PUT");
  },

  seek: async (positionMs) => {
    return fetchFromPlayerApi(`/player/seek?position_ms=${positionMs}`, "PUT");
  },

  transferPlayback: async (deviceId, play = true) => {
    return fetchFromPlayerApi("/player/device", "PUT", {
      device_ids: [deviceId],
      play: play
    });
  }
};