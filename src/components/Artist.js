import { React, useState, useEffect } from "react";
import "../css/album.css";
import Image from "react-bootstrap/Image";

function Artist(props) {
  console.log(props);
  return (
    <div class="album">
      <div class="cover-container">
        <div class="cover-image">
          <a alt="" href="" className="block-icon">
            <Image
              src={props.artist.images[0].url}
              roundedCircle
              className="albumimg"
            />
          </a>
        </div>
      </div>
      <div className="songTitle">
        <div className="songName">{props.artist.name}</div>
        <div className="artist">
          {props.artist.genres.length < 1
            ? props.artist.genres && props.artist.genres.forEach(({ genre }) => {
                return `${genre}; `;
              })
            : `${props.artist.genres[0]}`}
        </div>
      </div>
    </div>
  );
}

export default Artist;
