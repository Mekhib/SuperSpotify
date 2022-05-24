import React from "react";
import { useNavigate } from "react-router";
import { topTracks, topArtist, userPlaylist, loggedIn } from "../js/user.js";




const LoggedIn = ({children}) => {
  // let navigate = useNavigate()
  //  const isLoggedIn = loggedIn.then(({statusCode})=>{
  //   console.log('statusCode',statusCode)
  // if(statusCode === 401){
  //   navigate("/")
  // }
  //     })
  return children

      
};

export default LoggedIn;
