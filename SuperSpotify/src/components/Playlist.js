import React from "react";
import { useNavigate } from "react-router-dom";
import ScrollContainer from "./ScrollHorizontal";
import Album from "./album"; // Using your newly responsive Album component!

const PlayList = ({ playlist }) => {
  const navigate = useNavigate();

  if (!playlist || !playlist.length) return null;

  return (
    <ScrollContainer>
      {playlist.map((item) => {
        // 1. Structure the playlist data to mimic what Album.js expects
        const adapterData = {
          id: item.id,
          type: "album", 
          name: item.name,
          // Use the playlist image, or fallback to the orange headphones default
          images: item.images?.length 
            ? item.images 
            : [{ url: "https://d2rd7etdn93tqb.cloudfront.net/wp-content/uploads/2022/03/spotify-playlist-cover-orange-headphones-032322.jpg" }],
     
          artists: [{ name: `${item.tracks?.total || 0} Tracks` }]
        };

        return (
          <Album
            key={item.id}
            song={adapterData}
            updateId={(id) => navigate(`/playlist/${id}`)}
          />
        );
      })}
    </ScrollContainer>
  );
};

export default PlayList;