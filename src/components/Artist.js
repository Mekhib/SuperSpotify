import { React, useState, useEffect } from "react";
import "../css/album.css";
import Image from "react-bootstrap/Image";
import { useNavigate } from "react-router";

function Artist(props) {
  console.log("artprops",props)
function goToArtist(id) {
  navigate(`/artist/${id}`);
}
  const navigate = useNavigate();
  console.log(props.artist.id);
  return (
    <div class="album" onClick={() => {goToArtist(props.artist.id)}}>
      <div class="cover-container">
        <div class="cover-image">
         
            <Image
              src={props.artist.images[0].url}
              roundedCircle
              className="albumimg"
            />
       
        </div>
      </div>
      <div className="songTitle">
        <div className="songName">{props.artist.name}</div>
        {/* <div className="artist">
          {props.artist.genres.length < 1
            ? props.artist.genres && props.artist.genres.forEach(({ genre }) => {
                return `${genre}; `;
              })
            : `${props.artist.genres[0]}`}
        </div> */}
      </div>
    </div>
  );
}

export default Artist;
