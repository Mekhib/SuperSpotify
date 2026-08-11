import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/albumView.css";
import LoadingSpinner from "./LoadingSpinner";
import Image from "react-bootstrap/Image";
import { useNavigate } from "react-router";

function AlbumView({ albums }) {
      const navigate = useNavigate();
    console.log("album", albums)
  if (albums) {
    return (
      <div className="artistContainer">
        {albums.map((album) => {
     
          return (
            <div>
              <Image
                src={
                  album.images[0]?.url ||
                  "https://www.kindpng.com/picc/m/74-741362_music-artist-icon-music-artist-icon-png-transparent.png"
                }
                className="albumViewArt"
                onClick={() => {
                  navigate(`/album/${album.id}`);
                }}
                responsive
              ></Image>
              <div className="albumViewtext">
                <p className="albumViewtextp">{album.name}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  } else {
    return <LoadingSpinner />;
  }
}

export default AlbumView;
