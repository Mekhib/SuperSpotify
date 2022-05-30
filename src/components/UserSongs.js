import { React, useState, useEffect } from "react";
import Navbar from "./navbar";
import Album from "./album"
import ScrollContainer from "./ScrollHorizontal"

function SongsList(props) {
  console.log("props!!!", props)
    const dataArray = props.userData.body.items || props.userData.body.tracks; ;
    const updateId = props.updateId
    const color = props.color
    return (
      <ScrollContainer>
        {props.userData &&
          dataArray &&
          dataArray.map((song) => {
            // let image = song.images[0].url;
            return (
              <Album
                updateId={updateId}
                song={song}
                color={color}
              
              />
            );
          })}
      </ScrollContainer>
    );
}

export default SongsList