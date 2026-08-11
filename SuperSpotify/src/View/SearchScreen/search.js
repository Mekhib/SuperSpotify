import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, ButtonGroup, Button, Spinner } from "react-bootstrap";
import TableView from "../../components/TableView.js";
import ArtistGridView from "../../components/ArtistGridView.js"; 
import AlbumView from "../../components/AlbumView.js";
import { searchService } from "../../services/searchService";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/search.css";

function Search({ updateId }) {
  const [inputText, setInputText] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [activeTab, setActiveTab] = useState("tracks"); // Default view
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  // 1. Unified Search Handler
  const executeSearch = async () => {
    if (!inputText.trim()) return;
    
    setLoading(true);
    setError(false);

    try {
      const data = await searchService.searchCatalog(inputText);
      if (data.status === 401) {
        alert("You must be logged in to search. Please log in.");
        navigate("/", { replace: true });

        return;
      }
      setSearchResults(data);
      setActiveTab("tracks"); 
    } catch (err) {
      console.error("Search failed:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const renderActiveView = () => {
    if (!searchResults) return null;

    switch (activeTab) {
      case "artists":
        return <ArtistGridView artists={searchResults.artistResults.artists.items} />;
      case "albums":
        return <AlbumView albums={searchResults.albumResults.albums.items} />;
      case "tracks":
         return <TableView updateId={updateId} data={searchResults.trackResults.tracks.items} />;
      default:
        return <TableView updateId={updateId} data={searchResults.trackResults.tracks.items} />;
    }
  };

return (
  <div className="searchContainer">
    <div className="searchBarContainer">
      <Form.Control
        className="searchInput"
        placeholder="Search for songs, artists, or albums..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            executeSearch();
          }
        }}
      />

      <Button
        className="apple-btn"
        onClick={executeSearch}
        disabled={loading}
      >
        {loading ? (
          <Spinner animation="border" size="sm" />
        ) : (
          "Search"
        )}
      </Button>
    </div>

    {error && (
      <div className="text-danger mt-3">
        Failed to load search results. Please try again.
      </div>
    )}

    {searchResults && !loading && (
      <>
        <div className="searchTabs">
          <ButtonGroup>
            <Button
              className={activeTab === "tracks" ? "tab-btn active" : "tab-btn"}
              onClick={() => setActiveTab("tracks")}
            >
              Tracks
            </Button>

            <Button
              className={activeTab === "artists" ? "tab-btn active" : "tab-btn"}
              onClick={() => setActiveTab("artists")}
            >
              Artists
            </Button>

            <Button
              className={activeTab === "albums" ? "tab-btn active" : "tab-btn"}
              onClick={() => setActiveTab("albums")}
            >
              Albums
            </Button>
          </ButtonGroup>
        </div>

        <div className="searchResultsContainer">
          {renderActiveView()}
        </div>
      </>
    )}
  </div>
);
}

export default Search;