import { React, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  useParams,
} from "react-router-dom";
import { getArtist, getArtistSongs } from "../js/global";
import "../css/artistScreen.css"
import FrostedGlassView from "./frostedGlassView";
import Image from "react-bootstrap/Image";
import SongsList from "./UserSongs";

function ArtistScreen({updateArtistId}){
    const [artData, updateArtData] = useState(undefined);
     const [artSongs, updateArtSongData] = useState(undefined);
    let { id } = useParams();
    useEffect(() => {
      if (!artData) {
        getArtist(id).then((artData) => {
          updateArtData(artData);
          console.log(artData)
        });
        
      }
            if (!artSongs) {
              getArtistSongs(id).then((artData) => {
                updateArtSongData(artData);
                console.log('artSong',artData);
              });
            }
    }, [artData, artSongs]);
     if (artData && artSongs) {
      return (
        <FrostedGlassView BgImage={artData.body.images[0].url}>
          <div className="artistImage">
            <Image
              src={artData.body.images[0].url}
              thumbnail
              responsive
              className="globalImage"
            />
            <div>{artData.body.name}</div>
            <div>{artData.body.followers?.total} Followers</div>
          </div>
          <h1 className="title">Your Top Songs</h1>
          <div className="listContainer">
            <SongsList userData={artSongs} />
          </div>
          <h1 className="title">Your Top Songs</h1>
          <div className="listContainer">
            <SongsList userData={artSongs} />
          </div>
        </FrostedGlassView>
      );
     }
 
}

export default ArtistScreen