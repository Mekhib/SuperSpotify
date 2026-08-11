import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import Image from "react-bootstrap/Image";
import TableView from "../../components/TableView.js";
import LoadingSpinner from "../../components/LoadingSpinner"; 
import { globalService } from "../../services/globalService";
import FrostedGlassView from "../../components/FrostedGlassView.js"; // Imported to match Artist Screen
import "../../css/table.css";
import "../../css/playlistScreen.css";

function PlayListScreen({ updateId }) {
  const { id } = useParams();
  const [playlistData, setPlaylistData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchPlaylist = async () => {
      try {
        setLoading(true);
        const data = await globalService.getPlaylist(id); 
        
        if (isMounted) {
          setPlaylistData(data);
          setError(false);
        }
      } catch (err) {
        console.error("Failed to fetch playlist", err);
        if (isMounted) {
          setError(true);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (id) {
      fetchPlaylist();
    }

    return () => {
      isMounted = false; 
    };
  }, [id]);

  const trackItems = useMemo(() => {
    return playlistData?.tracks?.items || [];
  }, [playlistData]);

  const filteredTracks = useMemo(() => {
    if (!searchQuery.trim()) return trackItems;

    const query = searchQuery.toLowerCase().trim();
    return trackItems.filter((item) => {
      const track = item.track;
      if (!track) return false;

      const trackName = track.name?.toLowerCase() || "";
      const albumName = track.album?.name?.toLowerCase() || "";
      const artistNames = track.artists?.map((a) => a.name.toLowerCase()).join(" ") || "";

      return (
        trackName.includes(query) ||
        albumName.includes(query) ||
        artistNames.includes(query)
      );
    });
  }, [trackItems, searchQuery]);

  if (loading) return <LoadingSpinner />;
  if (error || !playlistData) {
    return <div className="text-center mt-5 text-dark">Error loading playlist.</div>;
  }

  const coverUrl =
    playlistData.images?.[0]?.url ||
    "https://via.placeholder.com/300?text=No+Cover";
  const trackCount = playlistData.tracks?.total || trackItems.length;
  const ownerName = playlistData.owner?.display_name || "Unknown Creator";
  const followersCount = playlistData.followers?.total?.toLocaleString();

  return (
    <FrostedGlassView BgImage={coverUrl}>
      <div className="playlist-screen-wrapper">
        
        <div className="playlist-header">
          <div className="playlist-cover-wrapper">
            <Image
              src={coverUrl}
              alt={playlistData.name}
              className="playlist-cover-art"
            />
          </div>

          <div className="playlist-details">
            <span className="playlist-badge">PLAYLIST</span>
            <h1 className="playlist-title">{playlistData.name}</h1>

            {playlistData.description && (
              <p
                className="playlist-description"
                dangerouslySetInnerHTML={{ __html: playlistData.description }}
              />
            )}

            <div className="playlist-meta">
              <span className="meta-owner">{ownerName}</span>
              <span className="meta-divider">•</span>
              <span>{trackCount} tracks</span>
              {followersCount && (
                <>
                  <span className="meta-divider">•</span>
                  <span>{followersCount} likes</span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="playlist-search-container">
          <div className="search-input-wrapper">
            <svg
              className="search-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              className="playlist-search-input"
              placeholder="Search within this playlist..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                className="clear-search-btn"
                onClick={() => setSearchQuery("")}
              >
                ✕
              </button>
            )}
          </div>
        </div>

        <div className="playlist-table-container">
          {filteredTracks.length > 0 ? (
            <TableView updateId={updateId} data={filteredTracks} />
          ) : (
            <div className="no-results-text">
              No tracks found matching "{searchQuery}"
            </div>
          )}
        </div>
      </div>
    </FrostedGlassView>
  );
}

export default PlayListScreen;