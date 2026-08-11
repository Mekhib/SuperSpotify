import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Image from "react-bootstrap/Image";
import LoadingSpinner from "../../components/LoadingSpinner";
import { userService } from "../../services/userService";
import "../../css/userPlaylists.css";

function UserPlaylistsScreen() {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const fetchPlaylists = async () => {
      try {
        setLoading(true);
        const data = await userService.getUserPlaylists(); 
        
        if (isMounted) {
          // Spotify typically returns lists inside an 'items' array
          const playlistItems = data?.items || data?.body?.items || [];
          setPlaylists(playlistItems);
          setError(false);
        }
      } catch (err) {
        console.error("Failed to fetch user playlists", err);
        if (isMounted) {
          setError(true);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchPlaylists();

    return () => {
      isMounted = false;
    };
  }, []);

  const handlePlaylistClick = (playlistId) => {
    // Navigates to the playlist screen you built earlier
    navigate(`/playlist/${playlistId}`);
  };

  if (loading) return <LoadingSpinner />;
  if (error) {
    return <div className="text-center mt-5 text-white">Error loading playlists.</div>;
  }

  return (
    <div className="all-playlists-wrapper">
      <div className="playlists-header">
        <h1 className="playlists-page-title">Your Playlists</h1>
      </div>

      {playlists.length > 0 ? (
        <div className="playlists-grid">
          {playlists.map((playlist) => {
            const coverUrl = playlist.images?.[0]?.url || "https://via.placeholder.com/300?text=No+Cover";
            const trackCount = playlist.tracks?.total || 0;
            const ownerName = playlist.owner?.display_name || "Unknown Creator";

            return (
              <div 
                key={playlist.id} 
                className="playlist-glass-card"
                onClick={() => handlePlaylistClick(playlist.id)}
              >
                <div className="card-image-container">
                  <Image 
                    src={coverUrl} 
                    alt={playlist.name} 
                    className="card-cover-art"
                  />
                </div>
                <div className="card-info">
                  <h3 className="card-title">{playlist.name}</h3>
                  <p className="card-subtitle">
                    {trackCount} tracks • {ownerName}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="no-playlists-text">
          You don't have any playlists yet.
        </div>
      )}
    </div>
  );
}

export default UserPlaylistsScreen;