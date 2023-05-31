import { React } from "react";
import "../css/album.css";
import Image from "react-bootstrap/Image";
import { useNavigate } from "react-router";

function Artist(props) {
  console.log("artprops",props)
function goToArtist(id) {
  navigate(`/artist/${id}`);
  navigate(0);
}
  const navigate = useNavigate();
  console.log(props.artist.id);
  return (
    <div className="album" onClick={() => {goToArtist(props.artist.id)}}>
      <div className="cover-container">
        <div className="cover-image">
         
            <Image
              src={props.artist.images[0].url}
              roundedCircle
              className="albumimg"
            />
       
        </div>
      </div>
      <div className="songTitle">
        <div className="songName">{props.artist.name}</div>
      </div>
    </div>
  );
}

export default Artist;
