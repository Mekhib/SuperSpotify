import React from "react";
import "../css/footer.css";
import SpotifyPlayer from 'react-spotify-web-playback';




function Player({spotifyID}) {
let token = window.localStorage.getItem("token");
React.useEffect(()=>{
    console.log(spotifyID)
},[spotifyID])
if(spotifyID && token){
     return (
   
  <SpotifyPlayer
  token={token}
  uris={[spotifyID]}
/>
    )
}
   else {
       <div>
           hello working 
       </div>
   }
}

export default Player;
