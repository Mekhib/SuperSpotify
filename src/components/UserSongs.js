import { React, useState, useEffect } from "react";
import Navbar from "./navbar";
import Album from "./album"
import ScrollContainer from "./ScrollHorizontal"

function SongsList(props) {
    const dataArray = props.userData.body.items;
    return (
      <ScrollContainer>
        {props.userData &&
          dataArray &&
          dataArray.map((song) => {
            return <Album song={song} />;
          })}
      </ScrollContainer>
    );
}

export default SongsList