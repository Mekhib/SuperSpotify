import { React, useState, useEffect } from "react";
import Image from "react-bootstrap/Image";
import "../css/album.css"
import {play} from "../js/controls"

function Album(props) {
 console.log("props", props)
return (
  <div class="album" onClick={() => props.updateId(props.song.uri)}>
    <div class="cover-container">
      <div class="cover-image">
        <Image
          src={props.song.album?.images[0].url || props.song.images[1]?.url}
          style={{ maxWidth: "100%" }}
          responsive
        />
      </div>
    </div>
    <div
      className="songTitle"
      style={{ color: `${props.color ? props.color : "black"}` }}
    >
      <div
        className="songName"
        style={{ color: `${props.color ? props.color : "black"}` }}
      >
        {props.song.name}
      </div>
      <div
        className="artist"
        style={{ color: `${props.color ? props.color : "black"}` }}
      >
        {props.song.artists.length !== 1
          ? props.song.artists.map(({ name }) => {
              return `${name}; `;
            })
          : `${props.song.artists[0].name}`}
      </div>
    </div>
  </div>
);
}

export default Album;