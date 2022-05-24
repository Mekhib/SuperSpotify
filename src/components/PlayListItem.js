import { React, useState, useEffect } from "react";
import "../css/album.css";
import {
  BrowserRouter as Router,
  Link,
  useHistory,
} from "react-router-dom";

function PlayListItem(props) {
  console.log(props);
  return (
    <div class="album" onClick={props.onClick}>
      <div class="cover-container">
        <div class="cover-image">
          <img
            className="albumimg"
            src={
              props.playlist.images[0]?.url ||
              "https://d2rd7etdn93tqb.cloudfront.net/wp-content/uploads/2022/03/spotify-playlist-cover-orange-headphones-032322.jpg"
            }
          />
        </div>
      </div>
      <div className="songTitle">
        <div className="songName">{props.playlist.name}</div>
        <div className="artist">{props.playlist.tracks.total} Tracks</div>
      </div>
    </div>
  );
}

export default PlayListItem;
