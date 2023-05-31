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
    <div className="album" onClick={props.onClick}>
      <div className="cover-container">
        <div className="cover-image">
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
        <strong>{props.playlist.name}</strong>
        {props.playlist.tracks.total} Tracks
      </div>
    </div>
  );
}

export default PlayListItem;
