import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import Image from "react-bootstrap/Image";
import TableView from "../../components/TableView.js";
import LoadingSpinner from "../../components/LoadingSpinner";
import FrostedGlassView from "../../components/FrostedGlassView.js";
import { albumScreenApi } from "./index.js";
import "../../css/table.css";
import "../../css/albumScreen.css"; 

function AlbumScreen({ updateId }) {
  const { id } = useParams();
  const [albumData, setAlbumData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  // Search query state for filtering tracks inside the album
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchAlbum = async () => {
      try {
        setLoading(true);
        const data = await albumScreenApi.getAlbum(id); 
        
        if (isMounted) {
          // Changed to check and set 'data' directly instead of 'data.body'
          if (data && data.name) {
            setAlbumData(data);
            setError(false);
          } else {
            setError(true);
          }
        }
      } catch (err) {
        console.error("Failed to fetch album", err);
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
      fetchAlbum();
    }

    return () => {
      isMounted = false; 
    };
  }, [id]);

  // Extract track list and map it to the structure TableView expects
  const trackItems = useMemo(() => {
    if (!albumData || !albumData.tracks || !albumData.tracks.items) return [];
    
    const items = albumData.tracks.items;
    const albumImages = albumData.images || [];
    const albumName = albumData.name || "";

    return items.map(track => ({
      track: {
        ...track,
        album: {
          name: albumName,
          images: albumImages
        }
      }
    }));
  }, [albumData]);

  // Filter tracks by title or artist matching the search query
  const filteredTracks = useMemo(() => {
    if (!searchQuery.trim()) return trackItems;

    const query = searchQuery.toLowerCase().trim();
    return trackItems.filter((item) => {
      const track = item.track;
      if (!track) return false;

      const trackName = track.name?.toLowerCase() || "";
      const artistNames = track.artists?.map((a) => a.name.toLowerCase()).join(" ") || "";

      return trackName.includes(query) || artistNames.includes(query);
    });
  }, [trackItems, searchQuery]);

  if (loading) return <LoadingSpinner />;
  if (error || !albumData) {
    return <div className="text-center mt-5 text-white">Error loading album data.</div>;
  }

  const coverUrl = albumData.images?.[0]?.url || "https://via.placeholder.com/300?text=No+Cover";
  const trackCount = albumData.total_tracks || trackItems.length;
  const artistName = albumData.artists?.map(a => a.name).join(", ") || "Unknown Artist";
  const releaseYear = albumData.release_date ? albumData.release_date.substring(0, 4) : "";

  return (
    <FrostedGlassView BgImage={coverUrl}>
      <div className="album-screen-wrapper">
        
        {/* Album Header Section */}
        <div className="album-header">
          <div className="cover-wrapper">
            <Image
              src={coverUrl}
              alt={albumData.name}
              className="album-cover-art"
            />
          </div>

          <div className="album-details">
            <span className="album-badge">{albumData.album_type || "ALBUM"}</span>
            <h1 className="album-title">{albumData.name}</h1>

            <div className="album-meta">
              <span className="meta-owner">{artistName}</span>
              {releaseYear && (
                <>
                  <span className="meta-divider">•</span>
                  <span>{releaseYear}</span>
                </>
              )}
              <span className="meta-divider">•</span>
              <span>{trackCount} tracks</span>
            </div>
          </div>
        </div>

        {/* Track Search Bar Section */}
        <div className="album-search-container">
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
              className="album-search-input"
              placeholder="Search within this album..."
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

        {/* Album Table Track List */}
        <div className="album-table-container">
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

export default AlbumScreen;