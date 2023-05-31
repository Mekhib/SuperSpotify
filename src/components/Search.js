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
      default: return <TableView data={{ body: trackResults }} />;
        break;
    }
  }

  const search = (input) => {
    const tracks = getTracks(input).then((result) => {
    updateTrackResults(result);

    }
    );
    const albums = getAlbums(input).then((result) =>
    {
      updateAlbumResults(result);
    }
    );
    const artist = getArtist(input).then((result) =>
     {
       updateArtistResults(result);
        updateClick(true);
     }
  
    );  
    
  };

  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  React.useEffect(() => {}, [trackResults, albumResults, artistResults, selection]);
  return (
    <div className="searchContainer">
      <InputGroup>
        <Form.Control
          className="form"
          onChange={inputHandler}
          placeholder="Search"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              search(inputText);
            }
          }}
        />
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

      {isClicked &&
        trackResults &&
        albumResults &&
        artistResults &&
        renderSelection()}
    </div>
  );
}

export default Search;
