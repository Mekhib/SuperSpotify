import React from "react";
import ReactTransitions from 'react-transitions';
import Image from "react-bootstrap/Image";
import { fadeIn } from "react-animations";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/homeAlbums.css"
import "../css/animations.css";

function HomeAlbums() {
  return (
    <div id="cover">

    <Image
        src="https://images.complex.com/complex/images/c_fill,dpr_auto,f_auto,q_auto,w_1320/fl_lossy,pg_1/llhjvearsojblpotiwai/future-i-never-liked-you-cover?fimg-ssr-default"
        thumbnail
        responsive
      />
    
      <Image
        src="https://m.media-amazon.com/images/I/71szkhEjZKL._SL1200_.jpg"
        thumbnail
        responsive
      />
         
     
      <Image
        src="https://www.udiscovermusic.com/wp-content/uploads/2020/04/Mariah-Carey-The-Emancipation-Of-Mimi-album-cover-820.jpg"
        thumbnail
        responsive
      />
         
     
      <Image
        src="https://ibighit.com/bts/images/bts/discography/love_yourself-answer/album-cover.jpg"
        thumbnail
        responsive
      />
         
    </div>
  );
}

export default HomeAlbums;
