import { React, useState, useEffect } from "react";
import Navbar from "./navbar";
import PlayListItem from "./PlayListItem";
import ScrollContainer from "./ScrollHorizontal";

function PlayList(props) {
  const dataArray = props.playlist.body.items;
  return (
    <ScrollContainer>
      {props.playlist &&
        dataArray &&
        dataArray.map((playList) => {
          return <PlayListItem playlist={playList} />;
        })}
    </ScrollContainer>
  );
}

export default PlayList;
