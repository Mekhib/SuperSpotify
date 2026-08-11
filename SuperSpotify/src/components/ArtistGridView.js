import React from "react";
import LoadingSpinner from "./LoadingSpinner";
import Artist from "./Artist";
import Title from "./Title";
import "../css/artistGrid.css";

function ArtistGridView({ artists, title }) {
  if (!artists) {
    return <LoadingSpinner />;
  }

  if (artists.length === 0) {
    return <div className="text-center text-muted py-4">No artists available.</div>;
  }

  return (
    <div className="artist-grid-wrapper">
      {title && <Title text={title} />}
      <div className="artist-grid-container">
        {artists.map((artist) => (
          <Artist artist={artist} key={artist.id || artist.uri} />
        ))}
      </div>
    </div>
  );
}

export default ArtistGridView;