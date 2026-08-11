import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Image from "react-bootstrap/Image";
import FrostedGlassView from "../../components/FrostedGlassView";
import { useSpotifyPlayer } from "../PlayerScreen/index";
import { playerService } from "../../services/playerService"; 
import { FaPlay, FaPause, FaStepForward, FaStepBackward } from "react-icons/fa";
import "../../css/nowPlaying.css";

function NowPlayingScreen() {
  const player = useSpotifyPlayer();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("queue");

  const [lyrics, setLyrics] = useState(null);
  const [isLoadingLyrics, setIsLoadingLyrics] = useState(false);
  const [lyricsError, setLyricsError] = useState(null);

  const trackName = player.track?.name;
  const primaryArtist = player.track?.artists?.[0]?.name;

  useEffect(() => {
    if (!trackName || !primaryArtist) return;

    let isSubscribed = true;

    const fetchLyrics = async () => {
      setIsLoadingLyrics(true);
      setLyricsError(null);

      try {
        const response = await playerService.getLyrics(primaryArtist, trackName);
        
        if (isSubscribed) {
          if (response && response.lyrics) {
            setLyrics(response.lyrics);
          } else {
            setLyrics(null);
            setLyricsError("Lyrics not found for this track.");
          }
        }
      } catch (error) {
        if (isSubscribed) {
          console.error("Error fetching lyrics:", error);
          setLyrics(null);
          setLyricsError("Unable to load lyrics at this time.");
        }
      } finally {
        if (isSubscribed) {
          setIsLoadingLyrics(false);
        }
      }
    };

    fetchLyrics();

    // Cleanup 
    return () => {
      isSubscribed = false;
    };
  }, [trackName, primaryArtist]);

  if (!player.track) {
    return (
      <div className="empty-player-screen">
        <h2>Nothing is playing</h2>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  const coverUrl = player.track.album?.images?.[0]?.url;
  const progressPercent = (player.progressMs / player.durationMs) * 100 || 0;

  
  const playQueueTrack = async (uri) => {
    try {
      await playerService.play({ uris: [uri] }); 
    } catch (error) {
      console.error("Failed to play track", error);
    }
  };

  return (
    <FrostedGlassView BgImage={coverUrl}>
      <div className="now-playing-wrapper">
        
        {/* Top Navigation */}
        <button className="minimize-btn" onClick={() => navigate(-1)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>

        <div className="np-layout-grid">
          
          {/* Left Column: Artwork and Controls */}
          <div className="np-primary-column">
            <div className="np-art-container">
              <Image src={coverUrl} className="np-album-art" />
            </div>

            <div className="np-track-details">
              <h1 className="np-title">{player.track.name}</h1>
              <h2 className="np-artist">{player.track.artists?.map(a => a.name).join(", ")}</h2>
            </div>

            {/* Scrub Bar */}
            <div className="np-progress-container">
              <div className="np-progress-bg">
                <div className="np-progress-fill" style={{ width: `${progressPercent}%` }} />
              </div>
              <div className="np-time-markers">
                <span>{formatTime(player.progressMs)}</span>
                <span>{formatTime(player.durationMs)}</span>
              </div>
            </div>

            {/* Playback Controls */}
            <div className="np-controls">
              <button onClick={player.handlePrev}><FaStepBackward/></button>
              <button onClick={player.togglePlay} className="np-play-btn">
                {player.isPlaying ? <FaPause/> : <FaPlay/>}
              </button>
              <button onClick={player.handleNext}><FaStepForward/></button>
            </div>
          </div>

          {/* Right Column: Queue and Lyrics */}
          <div className="np-secondary-column">
            <div className="np-tabs">
              <button 
                className={activeTab === "queue" ? "active" : ""} 
                onClick={() => setActiveTab("queue")}
              >
                Up Next
              </button>
              <button 
                className={activeTab === "lyrics" ? "active" : ""} 
                onClick={() => setActiveTab("lyrics")}
              >
                Lyrics
              </button>
            </div>

            <div className="np-tab-content">
              {activeTab === "queue" ? (
                <ul className="np-queue-list">
                  {player.queue?.length > 0 ? (
                    player.queue.map((track, index) => (
                      <li key={index} className="np-queue-item" onClick={() => playQueueTrack(track.uri)}>
                        <Image src={track.album?.images?.[0]?.url} className="np-queue-thumb" />
                        <div className="np-queue-info">
                          <span className="np-queue-title">{track.name}</span>
                          <span className="np-queue-artist">{track.artists?.[0]?.name}</span>
                        </div>
                      </li>
                    ))
                  ) : (
                    <div className="np-empty-state">Queue is empty</div>
                  )}
                </ul>
              ) : (
                <div className="np-lyrics-container">
                  {isLoadingLyrics ? (
                    <div className="np-lyrics-placeholder">Loading lyrics...</div>
                  ) : lyricsError ? (
                    <div className="np-lyrics-placeholder">{lyricsError}</div>
                  ) : lyrics ? (
                    <div className="np-lyrics-text">{lyrics}</div>
                  ) : (
                    <div className="np-lyrics-placeholder">No lyrics available for this track.</div>
                  )}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </FrostedGlassView>
  );
}

function formatTime(ms) {
  if (!ms) return "0:00";
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export default NowPlayingScreen;