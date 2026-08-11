import React from "react";
import Image from "react-bootstrap/Image";
import { FaPlay, FaPause, FaMusic, FaBackward, FaForward } from "react-icons/fa";

function PlayerPill({ player, isHovered, onClick }) {
  const coverUrl = player.track?.album?.images?.[0]?.url;
  const trackName = player.track?.name || "No Track";
  const artistName = player.track?.artists?.map(a => a.name).join(", ") || "";

  const progressPercent = (player.progressMs / player.durationMs) * 100 || 0;

  return (
    <div className="player-pill-content">
      
      <div className={`pill-collapsed ${isHovered ? "hidden" : ""}`}>
        <Image src={coverUrl} className="pill-thumb-small" roundedCircle />
        
        <div className="pill-info-compact">
          <div className="pill-title-compact">{trackName}</div>
        </div>
        
        <div className="pill-controls-compact" onClick={e => e.stopPropagation()}>
          <button onClick={player.togglePlay} className="play-btn-compact">
              {player.isPlaying ? <FaPause/> : <FaPlay/>}
          </button>
        </div>
      </div>

      <div className={`pill-expanded ${isHovered ? "visible" : ""}`}>
        
        <div className="pill-art-expanded-wrapper">
          <Image src={coverUrl} className="pill-art-expanded" />
        </div>
        
        <div className="pill-info-expanded">
          <div className="pill-title-expanded">{trackName}</div>
          <div className="pill-artist-expanded">{artistName}</div>
        </div>
        
        <div className="pill-progress-container" onClick={e => e.stopPropagation()}>
          <div className="pill-progress-bg">
            <div 
              className="pill-progress-fill" 
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* 4. Controls at Bottom */}
        <div className="pill-controls-expanded" onClick={e => e.stopPropagation()}>
          <button onClick={player.handlePrev}><FaBackward/></button>
          <button onClick={player.togglePlay} className="play-btn-expanded">
            {player.isPlaying ? <FaPause/> : <FaPlay/>}
          </button>
          <button onClick={player.handleNext}><FaForward/></button>
        </div>

      </div>
      
    </div>
  );
}

export default PlayerPill;