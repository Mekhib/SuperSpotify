import {React, useState, useEffect} from "react";
import Navbar from "./navbar";
import {topTracks, topArtist, userPlaylist} from "../js/user.js"
import {globalPlaylist, globalAlbumPlaylist} from "../js/global.js"
import SongsList from "./UserSongs"
import ArtistList from "./UserArtists";
import GlobalList from "./GlobalList";
import GlobalAlbum from "./GlobalAlbum";
import Playlist from "./Playlist";
import LoadingSpinner from "./LoadingSpinner";
import "../css/start.css"
import "bootstrap/dist/css/bootstrap.css";


function Start({updateId}) {

  const [userData, updateUserData] = useState(undefined);
   const [artistData, updateArtistData] = useState(undefined);
    const [playlists, updatePlaylist] = useState(undefined);
    const [globalSongs, updateGlobalSongs] = useState(undefined);
    const [globalAlbum, updateGlobalAlbum] = useState(undefined);
    

   useEffect(() => {
     async function getData() {
        const songs = await topTracks.then(res => {updateUserData(res)})
        const artists = await topArtist.then((res) => {
          updateArtistData(res);
        });
        const playlist = await userPlaylist.then((res)=> {
          updatePlaylist(res)
        })
          const global = await globalPlaylist.then((res) => {
            updateGlobalSongs(res);
          });
            const globalAlbum = await globalAlbumPlaylist.then((res) => {
              updateGlobalAlbum(res);
            });
      }
      getData()
   }, [userData,artistData, playlists, globalSongs]);

   if (userData && artistData && playlists && globalSongs && globalAlbum) {
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
             <h2>Top Podcasts</h2>
             <GlobalList global={globalSongs} />
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
