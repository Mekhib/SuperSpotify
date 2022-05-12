import { React, useState, useEffect } from "react";
import "../css/album.css"
import {play} from "../js/controls"

function Album(props) {
    console.log(props)
  
return (
  <div class="album" onClick={()=>play(props.song.uri)}>
    <div class="cover-container">
      <div class="cover-image">
       
          <img className="albumimg" src={props.song.album.images[0].url} />
      
      </div>
    </div>
    <div className="songTitle">
      <div className="songName">{props.song.name}</div>
      <div className="artist">
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