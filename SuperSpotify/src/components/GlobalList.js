import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Image from "react-bootstrap/Image";
import LoadingSpinner from "./LoadingSpinner";
import "../css/global.css";

function GlobalList({ list, updateId }) {
  console.log("GlobalList received list:", list);
  if (!list) return <LoadingSpinner />;

  if (list.length === 0) {
    return <div className="text-center text-muted py-4">No tracks available.</div>;
  }

  // Format milliseconds into m:ss
  const formatDuration = (millis) => {
    if (!millis) return "";
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <ListGroup as="ol" variant="flush" className="listGroup">
      {list.map((item, index) => {
        // Resolve nested track objects cleanly
        const track = item.track || item;
        if (!track) return null;

        const imageUrl =
          track.album?.images?.[0]?.url ||
          track.images?.[0]?.url ||
          "https://via.placeholder.com/48";
        
        const artistNames = track.artists?.map((a) => a.name).join(", ") || "Unknown Artist";
        const albumName = track.album?.name;
        const duration = formatDuration(track.duration_ms);

        return (
          <ListGroup.Item
            key={track.id || track.uri || index}
            className="listItem"
            onClick={() => updateId && updateId(track.uri || track.id)}
          >
            <Image
              src={imageUrl}
              className="globalImage"
              alt={track.name || "Track artwork"}
            />
            
            <div className="listItemInfo">
              <div className="listItemInfoName" title={track.name}>
                {track.name || "Untitled Track"}
              </div>
              <div className="listItemMetadata" title={`${artistNames}${albumName ? ` • ${albumName}` : ""}`}>
                {artistNames} {albumName ? `• ${albumName}` : ""}
              </div>
            </div>

            {duration && <div className="listItemDuration">{duration}</div>}
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
}

export default GlobalList;