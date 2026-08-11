import React, { useState, useRef, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useSpotifyPlayer } from "./index";
import PlayerPill from "./PlayerPill";
import FullScreenPlayer from "./FullScreenPlayer";
import "../../css/musicPlayer.css";

function MusicPlayer() {
  const player = useSpotifyPlayer();
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate()
  // Drag logic state
  const [positionX, setPositionX] = useState(24); 
  const isDragging = useRef(false);
  const startX = useRef(0);
  const currentX = useRef(positionX);

  // Handle Dragging 
  const onPointerDown = (e) => {
    if (window.innerWidth <= 768 || isFullScreen) return; 
    isDragging.current = true;
    startX.current = e.clientX - currentX.current;
    document.body.style.userSelect = "none"; 
  };

  const onPointerMove = (e) => {
    if (!isDragging.current) return;
    let newX = e.clientX - startX.current;
    
    // Boundary constraints
    const maxRight = window.innerWidth - 300; 
    if (newX < 24) newX = 24;
    if (newX > maxRight) newX = maxRight;
    
    currentX.current = newX;
    setPositionX(newX);
  };

  const onPointerUp = () => {
    isDragging.current = false;
    document.body.style.userSelect = "auto";
  };

  useEffect(() => {
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, []);

//   if (!player.track) return null; 

  return (
    <>
      {/* Draggable Pill View */}
      <div
        className={`player-pill-wrapper ${isFullScreen ? "hidden" : ""} ${isHovered ? "expanded" : ""}`}
        style={{ transform: `translateX(${positionX}px)` }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onPointerDown={onPointerDown}
      >
        <PlayerPill 
          player={player} 
          isHovered={isHovered} 
          onClick={() => {
            navigate("/now-playing")
          }} 
        />
      </div>

      {/* Full Screen View */}
      {isFullScreen && (
        <FullScreenPlayer 
          player={player} 
          onClose={() => setIsFullScreen(false)} 
        />
      )}
    </>
  );
}

export default MusicPlayer;