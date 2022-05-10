import { React, useState, useEffect } from "react";
import Navbar from "./navbar";
import Artist from "./Artist";
import ScrollContainer from "./ScrollHorizontal";

function ArtistList(props) {
  const dataArray = props.artistData.body.items
  console.log(dataArray);
  return (
    <ScrollContainer>
      {props.artistData &&
        dataArray &&
        dataArray.map((artist) => {
          return <Artist artist={artist} />;
        })}
    </ScrollContainer>
  );
}

export default ArtistList;
