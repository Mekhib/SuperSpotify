import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/search.css"
import {Form, InputGroup} from "react-bootstrap";
import TableView from "./Table";
import ArtsitView from "./ArtistView"
 import AlbumView from "./AlbumView";
import Col from "react-bootstrap/Col";
import { ButtonGroup, Button } from "react-bootstrap";
import "../js/search.js";
import { getAlbums, getTracks, getArtist } from "../js/search.js";

function Search(props) {
  const [inputText, setInputText] = React.useState("");
  const [isClicked, updateClick] = React.useState(false);
  const [trackResults, updateTrackResults] = React.useState(undefined);
  const [albumResults, updateAlbumResults] = React.useState(undefined);
  const [artistResults, updateArtistResults] = React.useState(undefined);
  const [selection, updateSelection] = React.useState(undefined)

  const renderSelection = () => {
    switch (selection) {
      case "tracks":
        return <TableView data={{body: trackResults}} />;
        break;
      case "Artists":
        return <ArtsitView data={{ body: artistResults }} />;
        break;
      case "Albums":
        return <AlbumView data={{ body: albumResults }} />;
        break;

      default: return 
        break;
    }
  }

  const search = (input) => {
    console.log(input)
    const tracks = getTracks(input).then((result) => {
    console.log(result);
    updateTrackResults(result);
    }

    );
    const albums = getAlbums(input).then((result) =>
    {
      console.log(result);
      updateAlbumResults(result);
    }
    );
    const artist = getArtist(input).then((result) =>
     {
       console.log(result);
       updateArtistResults(result);
     }
  
    );  
     updateClick(true)
  };

  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
    console.log(inputText)
  };

  React.useEffect(() => {}, [trackResults, albumResults, artistResults, selection]);
  return (
    <div className="searchContainer">
      <InputGroup>
        <Form.Control
          className="form"
          onChange={inputHandler}
          placeholder="Search"
        />

        <button
          type="button"
          className="buttns"
          onClick={() => search(inputText)}
        >
          <svg width="15px" height="15px">
            <path d="M11.618 9.897l4.224 4.212c.092.09.1.23.02.312l-1.464 1.46c-.08.08-.222.072-.314-.02L9.868 11.66M6.486 10.9c-2.42 0-4.38-1.955-4.38-4.367 0-2.413 1.96-4.37 4.38-4.37s4.38 1.957 4.38 4.37c0 2.412-1.96 4.368-4.38 4.368m0-10.834C2.904.066 0 2.96 0 6.533 0 10.105 2.904 13 6.486 13s6.487-2.895 6.487-6.467c0-3.572-2.905-6.467-6.487-6.467 "></path>
          </svg>
        </button>
      </InputGroup>
      {isClicked && (
        <div className="buttnGroup">
          <ButtonGroup>
            <Button
              className="btnGroupBtn"
              variant="secondary"
              onClick={() => updateSelection("tracks")}
            >
              Tracks
            </Button>
            <Button
              className="btnGroupBtn"
              variant="secondary"
              onClick={() => updateSelection("Artists")}
            >
              Artists
            </Button>
            <Button
              className="btnGroupBtn"
              variant="secondary"
              onClick={() => updateSelection("Albums")}
            >
              Albums
            </Button>
          </ButtonGroup>
        </div>
      )}

      {renderSelection()}
    </div>
  );
}

export default Search;
