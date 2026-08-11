import { useState, useEffect, useCallback } from "react";
import { playerService } from "../../services/playerService"; 

export function useSpotifyPlayer() {
  const [playerState, setPlayerState] = useState({
    isPlaying: false,
    track: null,
    progressMs: 0,
    durationMs: 0,
    queue: [] 
  });

  useEffect(() => {
    let isMounted = true;
    const fetchState = async () => {
      try {
        const state = await playerService.getPlaybackState(); 
        if (isMounted && state && state.item) {
          setPlayerState((prev) => ({
            ...prev,
            isPlaying: state.is_playing,
            track: state.item,
            progressMs: state.progress_ms,
            durationMs: state.item.duration_ms,
          }));
        }
      } catch (err) {
        console.error("Error fetching player state:", err);
      }
    };

    fetchState();
    const interval = setInterval(fetchState, 3000); // Poll every 3 seconds
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const togglePlay = useCallback(async () => {
    try {
      if (playerState.isPlaying) {
        await playerService.pause(); 
        setPlayerState((prev) => ({ ...prev, isPlaying: false }));
      } else {
        await playerService.play(); 
        setPlayerState((prev) => ({ ...prev, isPlaying: true }));
      }
    } catch (err) {
      console.error("Playback toggle failed", err);
    }
  }, [playerState.isPlaying]);

  const handleNext = async () => await playerService.next(); 
  const handlePrev = async () => await playerService.previous(); 
  const handleSeek = async (ms) => {
    await playerService.seek(ms); 
    setPlayerState((prev) => ({ ...prev, progressMs: ms }));
  };

  return {
    ...playerState,
    togglePlay,
    handleNext,
    handlePrev,
    handleSeek,
  };
}