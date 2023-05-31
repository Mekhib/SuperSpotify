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
import { useNavigate } from "react-router";


function ArtistScreen({updateArtistId}){
    const [artData, updateArtData] = useState(undefined);
     const [artSongs, updateArtSongData] = useState(undefined);
     const [artAlbums, updateAlbums] = useState(undefined);
      const [artArt, updateArtArt] = useState(undefined);
      const navigate = useNavigate();

const updateId = (id) => {
  navigate(`/album/${id}`, {state: {artData:artData}});
};


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

          <div className="listContainer">
            <div className="title">
              <div className="titleText" style={{ color: "white" }}>
                Top Songs
              </div>
            </div>
            <SongsList
              updateId={updateId}
              color={"white"}
              userData={artSongs}
            />
          </div>

          <div className="listContainer" style={{ color: "white" }}>
            <div className="title">
              <div className="titleText" style={{ color: "white" }}>
                Albums
              </div>
            </div>
            <SongsList
              updateId={updateId}
              artAlbums={artAlbums}
              color={"white"}
              userData={artAlbums}
            />
          </div>

          <div
            className="listContainer"
            style={{ color: "white", marginBottom: "50px" }}
          >
            <div className="title">
              <div className="titleText" style={{ color: "white" }}>
                You May Like...
              </div>
            </div>
            <ArtistList color={"white"} artistData={artArt} />
          </div>
        </FrostedGlassView>
      );
     }
 
}

export default ArtistScreen