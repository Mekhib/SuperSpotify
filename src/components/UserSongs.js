import { React, useState, useEffect } from "react";
import Navbar from "./navbar";
import Album from "./album"
import ScrollContainer from "./ScrollHorizontal"

function SongsList(props) {
    const dataArray = props.userData.body.items;
    const updateId = props.updateId
    return (
      <ScrollContainer>
        {props.userData &&
          dataArray &&
          dataArray.map((song) => {
            return <Album updateId={updateId} song={song} />;
          })}
      </ScrollContainer>
    );
}

export default SongsList