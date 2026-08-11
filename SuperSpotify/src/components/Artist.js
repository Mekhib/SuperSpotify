import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/artistGrid.css";

function Artist({ artist }) {
  const navigate = useNavigate();

  if (!artist) return null;

  const handleClick = () => {
    navigate(`/artist/${artist.id}`);
  };

  // Safe image extraction with fallback
  const imageUrl =
    artist.images?.[0]?.url ||
    "https://www.kindpng.com/picc/m/74-741362_music-artist-icon-music-artist-icon-png-transparent.png";

  // Format follower numbers (e.g. 1200000 -> "1.2M followers")
  const formatFollowers = (count) => {
    if (!count) return null;
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M followers`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K followers`;
    return `${count} followers`;
  };

  // Determine metadata display (Followers or Primary Genre)
  const metadata =
    formatFollowers(artist.followers?.total) ||
    (artist.genres?.length ? artist.genres[0] : "Artist");

  return (
    <div className="artist-card" onClick={handleClick}>
      <div className="artist-avatar-wrapper">
        <img src={imageUrl} alt={artist.name} loading="lazy" />
      </div>
      <div className="artist-info">
        <h4 className="artist-name" title={artist.name}>
          {artist.name}
        </h4>
        <p className="artist-meta" title={metadata}>
          {metadata}
        </p>
      </div>
    </div>
  );
}

export default Artist;