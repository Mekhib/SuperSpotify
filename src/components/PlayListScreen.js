import { React, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import Image from "react-bootstrap/Image";
import "bootstrap/dist/css/bootstrap.css";
import Table from "react-bootstrap/Table";
import "../css/start.css"
import "../css/table.css";
import {getPlaylist} from "../js/global"

function PlayListScreen({updateId}) {
const [data, updateData] = useState(undefined)
useEffect(()=>{
  if(!data) {
 getPlaylist(id).then((data) => {
   updateData(data);
 });
  }
},[data])
function convert(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
return seconds == 60
  ? minutes + 1 + ":00"
  : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

let { id } = useParams();
if(data) {
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
          <div className="titleTrack">{`${data?.body.tracks.items.length} Tracks.`}</div>
        </div>
      </div>
      <Table responsive="true" hover="true" striped="true" size="sm">
        <thead>
          <th>Song</th>
          <th>Artist</th>
          <th>Album</th>
          <th>Time</th>
        </thead>
        <tbody>
          {data.body &&
            data.body.tracks?.items.map(({ track }) => {
              console.log("track", track);
              return (
                <tr onClick={()=>updateId(track.uri)}>
                  <td className="imageName">
                    <Image
                      src={track.album.images[0].url}
                      thumbnail
                      responsive
                      className="globalImage1"
                      style={{ width: "7%" }}
                    />
                    <h2>{track.name}</h2>
                  </td>
                  <td className="artistName align-middle">
                    <div className="align-middle">
                      {track.artists && track.artists.length !== 1
                        ? track.artists.map((artist) => {
                            return `${artist.name}; `;
                          })
                        : `${track.artists[0].name}`}
                    </div>
                  </td>
                  <td className="trackName align-middle">
                    <div>{track.album.name}</div>
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
}
else {
  <div>Hello Work</div>
}
}

export default PlayListScreen;
