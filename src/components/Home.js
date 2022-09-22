import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { loggedIn } from "../js/user";
import { setWebToken } from "../js/global";
import { Navbar, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import {FaSpotify} from "react-icons/fa"
import { Navigate } from "react-router-dom";
import HomeAlbums from "./HomeAlbums";
import "../css/home.css";


function Homepage () {
const CLIENT_ID = "e4fe20831fd44f7f9dca5cd597f58779";
const REDIRECT_URI = "http://localhost:3000/";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";
const SCOPE =
  "user-top-read,user-read-private,user-read-playback-state,user-modify-playback-state,user-read-recently-played,user-library-read";
let navigate = useNavigate();
const [stateToken, setToken] = React.useState(false);
  React.useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");
    if (token) setToken(token)
    if (hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
      setWebToken(token)
      setToken(token);
    }  
  },[stateToken]);
if(stateToken){
  return <Navigate to="/auth"/>
}
else {
return (
  <body>
    <div className="homeAlbums">
      {" "}
      <HomeAlbums />
    </div>
    <div className="headline">
      <h1>
        <strong>
          Experince The Best of Spotify, In a Beautiful New Package.
        </strong>
      </h1>
    </div>
    <div className={"button"}>
      <a
        href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}
      >
        {" "}
        <Button className="buttn" variant="success">
          <div>
            {" "}
            <div className="signIn">
              <FaSpotify /> Sign in With Spotify
            </div>
          </div>
        </Button>{" "}
      </a>
    </div>
  </body>
);
}


}


export default Homepage;