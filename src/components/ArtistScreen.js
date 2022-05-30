import { React, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  useParams,
} from "react-router-dom";
import { getArtist, getArtistSongs, getArtistAlbums, getArtistArtist } from "../js/global";
import "../css/artistScreen.css"
import FrostedGlassView from "./frostedGlassView";
import Image from "react-bootstrap/Image";
import ArtistList from "./UserArtists";
import "../css/text.scss"
import SongsList from "./UserSongs";

function ArtistScreen({updateArtistId}){
    const [artData, updateArtData] = useState(undefined);
     const [artSongs, updateArtSongData] = useState(undefined);
     const [artAlbums, updateAlbums] = useState(undefined);
      const [artArt, updateArtArt] = useState(undefined);

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

                 if (!artAlbums) {
                   getArtistAlbums(id).then((artData) => updateAlbums(artData));
                 }

                 if(!artArt) {
                    getArtistArtist(id).then((artData)=>updateArtArt(artData))
                 }
    }, [artData, artSongs]);
     if (artData && artSongs && artAlbums) {
      return (
        <FrostedGlassView BgImage={artData.body.images[0].url}>
          <div className="artistImage " style={{ color: "white" }}>
            <Image
              src={artData.body.images[0].url}
              responsive
              className="globalImage artScrnImg"
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: "15px",
              }}
            >
              <span className="artNme" style={{ color: "white" }}>
                {artData.body.name}
              </span>
              <div className="artFollow" style={{ color: "white" }}>
                {artData.body.followers?.total} Followers
              </div>
            </div>
          </div>
          <h1 className="title" style={{ color: "white" }}>
            Top Songs
          </h1>
          <div className="listContainer">
            <SongsList color={"white"} userData={artSongs} />
          </div>
          <h1 className="title" style={{ color: "white" }}>
            Albums and Featues
          </h1>
          <div className="listContainer" style={{ color: "white" }}>
            <SongsList color={"white"} userData={artAlbums} />
          </div>
          <h1 className="title" style={{ color: "white" }}>
            Related Artists
          </h1>
          <div className="listContainer" style={{ color: "white" }}>
            <ArtistList color={"white"} artistData={artArt} />
          </div>
        </FrostedGlassView>
      );
     }
 
}

export default ArtistScreen