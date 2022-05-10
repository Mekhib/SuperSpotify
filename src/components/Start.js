import {React, useState, useEffect} from "react";
import Navbar from "./navbar";
import {topTracks, topArtist, userPlaylist} from "../js/user.js"
import SongsList from "./UserSongs"
import ArtistList from "./UserArtists";
import Playlist from "./Playlist";
import LoadingSpinner from "./LoadingSpinner";
import "../css/start.css"


function Start() {
  const [userData, updateUserData] = useState(undefined);
   const [artistData, updateArtistData] = useState(undefined);
    const [playlists, updatePlaylist] = useState(undefined);
    

   useEffect(() => {
     async function getData() {
        const songs = await topTracks.then(res => {updateUserData(res)})
        const artists = await topArtist.then((res) => {
          updateArtistData(res);
        });
        const playlist = await userPlaylist.then((res)=> {
          updatePlaylist(res)
        })
      }
      getData()
   }, [userData,artistData, playlists]);

   if(userData && artistData && playlists){
  return (
    <div>
      <h1 className="title">Your Top Songs</h1>
      <div className="listContainer">
        <SongsList userData={userData} />
      </div>
      <h1 className="title">Your Playlist</h1>
      <div className="listContainer">
        <Playlist playlist={playlists} />
      </div>
      <h1 className="title">Your Top Artists</h1>
      <div className="listContainer">
        <ArtistList artistData={artistData} />
      </div>
    </div>
  );
}
else {
  

   return <LoadingSpinner/>;
 
}
  
};

export default Start;
