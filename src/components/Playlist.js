import { React, useState, useEffect } from "react";
import { BrowserRouter as Router, Link,} from "react-router-dom";
import PlayListItem from "./PlayListItem";
import ScrollContainer from "./ScrollHorizontal";
import { useNavigate } from "react-router-dom";

const PlayList = (props) => {
  const dataArray = props.playlist.body.items;
  const navigate = useNavigate();
  function goToPlaylist(playListid) {
    navigate(`/playlist/${playListid}`)
  }
  const list = dataArray.map((playList) => {
    console.log(playList);
     
     return <PlayListItem
        onClick={() => {goToPlaylist(playList.id)}}
        playlist={playList}
      />
    
  });
  return (
    <ScrollContainer>
      {props.playlist &&
        dataArray && 
       list}
    </ScrollContainer>
  );
}

export default PlayList;
