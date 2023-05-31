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
       <body>
         <div className="listContainer">
           <div className="title">
             <div className="titleText">Your Top Songs</div>
           </div>
           <SongsList updateId={updateId} userData={userData} />
         </div>
         <div className="listContainer">
           <div className="title">
             <div className="titleText">Your Playlist</div>
           </div>
           <Playlist playlist={playlists} />
         </div>
         <div className="listContainer">
           <div className="title">
             <div className="titleText">Your Top Artists</div>
           </div>
           <ArtistList artistData={artistData} />
         </div>
         <div className="container listcontainer">
           <div className="listItems">
               <div className="titleText">Top Songs</div>
             <GlobalList global={globalSongs} />
           </div>
           <div className="listItems">
                  <div className="titleText">New Releases</div>
             <ReleasesList releases={newReleasesData} />
           </div>
           <div className="listItems">
              <div className="titleText">Top Albums</div>
             <GlobalAlbum global={globalAlbum} />
           </div>
         </div>
       </body>
     );
   } else {
     return <LoadingSpinner />;
   }
  
};

export default Start;
