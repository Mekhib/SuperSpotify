import {React, useState, useEffect} from "react";
import Navbar from "./navbar";
import {topTracks, topArtist, userPlaylist, loggedIn} from "../js/user.js"
import {globalPlaylist, globalAlbumPlaylist,newReleases} from "../js/global.js"
import SongsList from "./UserSongs"
import ArtistList from "./UserArtists";
import ReleasesList from "./ReleasesList";
import GlobalList from "./GlobalList";
import GlobalAlbum from "./GlobalAlbum";
import Playlist from "./Playlist";
import LoadingSpinner from "./LoadingSpinner";
import { useNavigate } from "react-router-dom";
import "../css/start.css"
import "bootstrap/dist/css/bootstrap.css";


function Start({updateId}) {
  const navigate = useNavigate();
  const [userData, updateUserData] = useState(undefined);
   const [artistData, updateArtistData] = useState(undefined);
    const [playlists, updatePlaylist] = useState(undefined);
    const [globalSongs, updateGlobalSongs] = useState(undefined);
    const [globalAlbum, updateGlobalAlbum] = useState(undefined);
    const [newReleasesData, updateReleases] = useState(undefined)
useEffect(() => {
async function getData() {

const songs = !userData && await topTracks.then((res) => {
  updateUserData(res);
});
const artists =
  !artistData &&
  (await topArtist.then((res) => {
    updateArtistData(res);
  }));
const playlist = !playlists && await userPlaylist.then((res) => {
  updatePlaylist(res);
});
const releases = !newReleasesData && await newReleases.then((res)=> {
  updateReleases(res)
})
const global =
  !globalSongs && (await globalPlaylist.then((res) => {
    updateGlobalSongs(res);
  }));
const globalAlbums = !globalAlbum && await globalAlbumPlaylist.then((res) => {
  updateGlobalAlbum(res);
});
}
      getData()
   }, [userData,artistData, playlists, globalSongs]);

   if (userData && artistData && playlists && globalSongs && globalAlbum && newReleasesData) {
     return (
       <div>
         <h1 className="title">Your Top Songs</h1>
         <div className="listContainer">
           <SongsList updateId={updateId} userData={userData} />
         </div>
         <h1 className="title">Your Playlist</h1>
         <div className="listContainer">
           <Playlist playlist={playlists} />
         </div>
         <h1 className="title">Your Top Artists</h1>
         <div className="listContainer">
           <ArtistList artistData={artistData} />
         </div>
         <div className="container listcontainer">
           <div className="listItems">
             <h2>Top Songs</h2>
             <GlobalList global={globalSongs} />
           </div>
           <div className="listItems">
             <h2>New Releases</h2>
             <ReleasesList releases={newReleasesData} />
           </div>
           <div className="listItems">
             <h2>Top Albums</h2>
             <GlobalAlbum global={globalAlbum} />
           </div>
         </div>
       </div>
     );
   } else {
     return <LoadingSpinner />;
   }
  
};

export default Start;
