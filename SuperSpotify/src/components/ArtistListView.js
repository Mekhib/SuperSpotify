import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// You can likely delete artistView.css entirely now!
import "../css/artistView.css"; 
import LoadingSpinner from "./LoadingSpinner";
import ScrollContainer from "./ScrollHorizontal";

function ArtistListView({ artists }) {
  const navigate = useNavigate();

  if (!artists) {
    return <LoadingSpinner />;
  }

  if (artists.length === 0) {
    return <div className="text-center mt-3">No artists available.</div>;
  }

  return (
    <ScrollContainer>
      {artists.map((artist) => {
        return (
          <div
            key={artist.id}
            className="album-card"
            onClick={() => {
              navigate(`/artist/${artist.id}`);
            }}
          >
            {/* 
          
            */}
            <div className="cover-wrapper rounded-circle">
              <img
                src={
                  artist.images?.[0]?.url ||
                  "https://www.kindpng.com/picc/m/74-741362_music-artist-icon-music-artist-icon-png-transparent.png"
                }
                alt={artist.name}
                loading="lazy"
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
              />
            </div>
    
            <div className="song-info text-center mt-2">
              <h4 className="song-title" title={artist.name}>
                {artist.name}
              </h4>
              <p className="song-artist">Artist</p>
            </div>
          </div>
        );
      })}
    </ScrollContainer>
  );
}

export default ArtistListView;