import { React, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { play } from "../js/controls";
import ListGroup from "react-bootstrap/ListGroup";
import Image from "react-bootstrap/Image";
import "../css/global.css";

function GlobalAlbum(props) {
  let data = props.global.body.tracks.items.splice(0, 5);

  console.log(data);

 
  return (
    <ListGroup as="ol" numbered variant="flush">
      {props.global.body.tracks.items &&
        data &&
        data.map((track, i) => {
          return (
            <ListGroup.Item className="listItem" key={i}>
              <Image
                src={track.track?.album.images[0].url}
                thumbnail
                responsive
                className="globalImage"
          
              />
              <div>
                <div>{track.track.name}</div>
                <div>
                  {track.track.artists &&
                    track.track.artists.map((artist) => {
                      return `${artist.name}; `;
                    })}
                </div>
              </div>
            </ListGroup.Item>
          );
        })}
    </ListGroup>
  );
}

export default GlobalAlbum;
