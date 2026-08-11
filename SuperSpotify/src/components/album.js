import React, { useState, useEffect } from "react";
import "../css/album.css";
import { playMedia } from '../utils/media.js';

function Album(props) {
  const [imgIndex, setImgIndex] = useState(0);

  const song = props.song?.track || props.song; 
  const { color } = props;

  const images = song?.album?.images || song?.images || [];
  const songIdentifier = song?.id || song?.uri;

  useEffect(() => {
    setImgIndex(0);
  }, [songIdentifier]);

  if (!song) return null;

  const handleError = () => {
    if (imgIndex < images.length - 1) {
      setImgIndex((prev) => prev + 1); 
    }
  };

  const imageUrl = images[imgIndex]?.url || "";
  
  const artistNames = song.artists?.map((artist) => artist.name).join(", ") || "Unknown Artist";
  const title = song.name || "Unknown Title";

  return (
    <div className="album-card" onClick={() => playMedia(song)}>
      <div className="cover-wrapper">
        <img 
          src={imageUrl} 
          alt={`${title} cover`} 
          loading="lazy" 
          onError={() => handleError()}
        />
      </div>
      <div className={props.frosted ? "song-info frosted" : "song-info"} style={{ color: color || "inherit" }}>
        <h4 className={props.frosted ? "frosted-text" : "song-title"} title={title}>
          {title}
        </h4>
        <div className={props.frosted ? "frosted-text" : "song-artist"} title={artistNames}>
          {artistNames}
        </div>
      </div>
    </div>
  );
}

export default Album;