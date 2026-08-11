import React, { useState } from "react";
import Image from "react-bootstrap/Image";
import FrostedGlassView from "../../components/FrostedGlassView"; 
import { FaPlay, FaPause, FaForward, FaBackward } from "react-icons/fa";

function FullScreenPlayer({ player, onClose }) {
  const [showQueue, setShowQueue] = useState(false);
  const coverUrl = player.track?.album?.images?.[0]?.url;

  return (
    <div className="fullscreen-player-portal">
  
      <FrostedGlassView BgImage={coverUrl}>
        <div className="fullscreen-player-content">
          
          <button className="close-player-btn" onClick={onClose}>
            ✕ Close
          </button>

          <div className="fs-layout">
        
            <div className={`fs-art-container ${showQueue ? "shrunk" : ""}`}>
              <Image src={coverUrl} className="fs-album-art" />
            </div>

         
            <div className="fs-controls-container">
              {!showQueue ? (
                <>
                  <div className="fs-track-info">
                    <h1 className="fs-track-name">{player.track?.name}</h1>
                    <h2 className="fs-artist-name">
                      {player.track?.artists?.map(a => a.name).join(", ")}
                    </h2>
                  </div>

                  {/* Playback Controls */}
                  <div className="fs-playback-controls">
                    <button onClick={player.handlePrev}><FaBackward/></button>
                    <button onClick={player.togglePlay} className="fs-play-btn">
                      {player.isPlaying ? <FaPause/> : <FaPlay/>}
                    </button>
                    <button onClick={player.handleNext}><FaForward/></button>
                  </div>

                  <button className="toggle-queue-btn" onClick={() => setShowQueue(true)}>
                    ≡ Show Queue
                  </button>
                </>
              ) : (
                /* Queue View */
                <div className="fs-queue-view">
                  <h3>Playing Next</h3>
                  <button className="toggle-queue-btn" onClick={() => setShowQueue(false)}>
                    Back to Player
                  </button>
                  <ul className="queue-list">
                
                    <li className="queue-item text-white-50">Queue data integration pending...</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          
        </div>
      </FrostedGlassView>
    </div>
  );
}

export default FullScreenPlayer;