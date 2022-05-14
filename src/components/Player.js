import React from "react";
import SpotifyPlayer from 'react-spotify-web-playback';
import "../css/player.css"




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
  magnifySliderOnHover={true}
  autoPlay={true}
  styles={{height: "50px", activeColor: "green", sliderHeight: "12px"}}
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
