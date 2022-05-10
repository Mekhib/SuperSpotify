import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { Navigate } from "react-router-dom";
import HomeAlbums from "./HomeAlbums";
import "../css/home.css";


function Homepage () {
const CLIENT_ID = "e4fe20831fd44f7f9dca5cd597f58779";
const REDIRECT_URI = "http://localhost:3000/";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";
const SCOPE = "user-top-read";
let navigate = useNavigate();
const [Statetoken, setToken] = React.useState(false);

  React.useEffect(() => {
    if (Statetoken) {
  navigate("/start");
    }
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }
 setToken(token);
  
  }, [Statetoken]);
return (
  <body>
    <div className="homeAlbums">
      {" "}
      <HomeAlbums />
    </div>
    <div className="headline">
      <h1>
        <strong>
          Experince The best of Spotify, In a beautiful new package.
        </strong>
      </h1>
    </div>
    <div className={"button"}>
      <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}> <Button variant="success">Sign in With Spotify</Button>{" "}</a>
    </div>
  </body>
);

}


export default Homepage;