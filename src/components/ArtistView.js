import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/artistView.css"
import LoadingSpinner from "./LoadingSpinner";
import Image from "react-bootstrap/Image";
import { useNavigate } from "react-router";


function ArtsitView({data}) {
  const navigate = useNavigate()
     if (data.body.artists.items) {
            return (
         <div className="artistContainer">
           {data.body.artists.items.map((artist) => {
               console.log("artist",artist);
             return (
               <div>
                 <Image
                 onClick={()=>{ navigate(`/artist/${artist.id}`);}}
                   src={
                     artist.images[0]?.url ||
                     "https://www.kindpng.com/picc/m/74-741362_music-artist-icon-music-artist-icon-png-transparent.png"
                   }
                   className="imageArt"
                   responsive
                   roundedCircle
                 ></Image>
                 <div className="artistText">
                   <p>{artist.name}</p>
                 </div>
               </div>
             );
           })}
         </div>
       );
     }

     else {
          return <LoadingSpinner />;
     }
   
}

export default ArtsitView