import { React, useState, useEffect } from "react";
import {
  BrowserRouter as
  useLocation,
  useParams,
} from "react-router-dom";
import Image from "react-bootstrap/Image";
import "bootstrap/dist/css/bootstrap.css";
import Table from "react-bootstrap/Table";
import "../css/start.css";
import "../css/table.css";
import TableView from "./Table";
import { getAlbums } from "../js/global";
// const palette = require("get-rgba-palette");
// const pixels = require("get-image-pixels");
// const imageColors = require("imagecolors");


function AlbumScreen({ updateId }) {
  const [data, updateData] = useState(undefined);
    const [artdata, updateArtData] = useState(undefined);
  let { id } = useParams();

  useEffect(() => {
    if (!data) {
      getAlbums(id).then((data) => {
        updateData(data);
        console.log("albumData", data)
      });
    }
  }, [data]);
  function convert(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return seconds == 60
      ? minutes + 1 + ":00"
      : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }
  

  if (data) {
      

    return (
      <div className="listcontainer">
        <div className="titleContainer">
          <Image
            src={data?.body.images[0].url}
            thumbnail
            responsive
            className="globalImage"
            style={{ width: "24%" }}
          />
          <div className="playlistTitle">
            <div className="titleName">{data?.body.name}</div>
            <div className="titleTrack">{`${data?.body.total_tracks} Tracks.`}</div>
          </div>
        </div>
        <Table responsive="true" hover="true" striped="true" size="sm">
          <thead>
            <th>Song</th>
            <th>Time</th>
          </thead>
          <tbody>
            {data.body &&
              data.body.tracks.items.map((track) => {
                console.log("track", track);
                return (
                  <tr onClick={() => updateId(track.uri)}>
                    <td className="imageName">
                      <Image
                        src={data?.body.images[0].url}
                        thumbnail
                        responsive
                        className="globalImage1"
                        style={{ width: "7%" }}
                      />
                      <h2>{track.name ? track.name : `(Untitled)`}</h2>
                    </td>
                    <td className="time align-middle">
                      <div>{convert(track.duration_ms)}</div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
    );
  } else {
    <div>Hello Work</div>;
  }
}

export default AlbumScreen;
