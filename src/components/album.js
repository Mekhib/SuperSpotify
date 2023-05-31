import { React} from "react";
import Image from "react-bootstrap/Image";
import "../css/album.css"

function Album(props) {
  const song = props.song.track ? props.song.track : props.song 
  let {color} = props
  console.log("songs!!", song);
return (
  <div
    className="album"
    onClick={() =>
      song.type === "album"
        ? props.updateId(song.id || song.track.id)
        : props.updateId(song.uri || song.track.uri)
    }
  >
    <div className="cover-container">
      <div className="cover-image">
        <Image
          src={song.album?.images[0].url || song.images[0].url}
          style={{ maxWidth: "100%" }}
          responsive
        />
      </div>
    </div>
    <div className="songTitle" style={{ color: `${color ? color : "black"}` }}>
      <strong>{props.song.name || props.song.track.name}</strong>

      {song.artists?.length !== 1
        ? song.artists.map(({ name }) => {
            return `${name}; `;
          })
        : `${song.artists[0].name}`}
    </div>
  </div>
);
}

export default Album;