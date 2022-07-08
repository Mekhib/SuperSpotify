import { React} from "react";
import "bootstrap/dist/css/bootstrap.css";
import ListGroup from "react-bootstrap/ListGroup";
import Image from "react-bootstrap/Image";
import "../css/global.css";

function ReleasesList(props) {
  let data = props.releases.body.albums.items;
  return (
    <ListGroup as="ol" numbered variant="flush" className="listGroup">
      {
        data &&
        data.map((track) => {
          return (
            <ListGroup.Item className="listItem">
              <Image
                src={track?.images[0].url}
                thumbnail
                responsive
                className="globalImage"
              />
              <div className="listItemInfo">
                <div className="listItemInfoName">{track.name}</div>
                <div>
                  {track.artists &&
                    track.artists.map((artist) => {
                      return `${artist.name}; `;
                    })}
                </div>
              </div>
            </ListGroup.Item>
          );
        })}
    </ListGroup>
  );
}

export default ReleasesList;
