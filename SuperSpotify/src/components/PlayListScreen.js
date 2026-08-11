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
import TableView from "./Table";
import "../css/start.css"
import "../css/table.css";
import {getPlaylist} from "../js/global"

function PlayListScreen(props) {
const [data, updateData] = useState(undefined)
let { id } = useParams();
useEffect(()=>{
  if(!data) {
 getPlaylist(id).then((data) => {
   updateData(data);
   console.log("playlist", data)
 });
  }
},[data])

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
      <TableView updateId={props.updateId} data={data}/>
    </div>
  );
}
else {
  <div>Hello Work</div>
}
}

export default PlayListScreen;
