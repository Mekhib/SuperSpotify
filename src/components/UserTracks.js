import { React, useState, useEffect } from "react";
import { userRecentTracks, userTracks } from "../js/user";
import SongsList from "./UserSongs";
import "../css/track.css"
import TableView from "./Table";


function UserTracks(props) {
  const [recentTracks, updateRecentTracks] = useState(undefined)
  const [tracks, updateTracks] = useState(undefined)
  useEffect(()=>{
  async function getTracks() {
  if (!recentTracks){
  let data = await userRecentTracks.then((data) => {
  if (data) {
      console.log(data);
      updateRecentTracks(data);
    }
  });
}
      if (!tracks) {
      let tracksData = await userTracks.then((data) => {
      if (data) {
          console.log("tracks data", data);
          updateTracks(data);
        }
      });
          }
      }
        getTracks()
    }, [recentTracks])

    if (recentTracks && tracks) {
return (
  <div className="listcontainer">
    <div className="title">
      <div className="titleText">Most Recent</div>
    </div>
    <SongsList userData={recentTracks} />
    <TableView data={tracks} updateId={props.updateId} />
  </div>
);
    } 
}

export default UserTracks