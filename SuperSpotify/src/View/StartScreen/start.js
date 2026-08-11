import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { startAPI } from "./index.js";
import "../../css/global.css";
import Title from "../../components/Title.js";
import SongsList from "../../components/SongsListView.js";
import ArtistList from "../../components/ArtistListView.js";
import Playlist from "../../components/Playlist.js";
import GlobalList from "../../components/GlobalList.js";
import LoadingSpinner from "../../components/LoadingSpinner.js";
import "bootstrap/dist/css/bootstrap.css";

function Start({ updateId }) {
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState({
    songs: null,
    artists: null,
    playlists: null,
    globalSongs: null,
    globalAlbum: null,
    newReleasesData: null,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

const fetchDashboard = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      console.log("🚀 Starting dashboard data fetch...");
      

      const results = await Promise.allSettled([
        startAPI.getTracks(),
        startAPI.getArtists(),
        startAPI.getPlaylists(),
        startAPI.getGlobalSongs(),
        startAPI.getGlobalAlbums(),
        startAPI.getNewReleases(),
      ]);

      console.log("📊 Raw Results from all API calls:", results);

      // Helper function to extract data or log the exact failure reason
      const extractData = (result, name) => {
        if (result.status === "fulfilled") {
          console.log(`✅ ${name} loaded successfully`);
          return result.value;
        } else {
          console.error(`❌ ${name} FAILED. Reason:`, result.reason);
          return null;
        }
      };

      const songs = extractData(results[0], "Top Tracks");
      const artists = extractData(results[1], "Top Artists");
      const playlists = extractData(results[2], "Playlists");
      const globalSongs = extractData(results[3], "Global Songs");
      const globalAlbum = extractData(results[4], "Global Albums");
      const newReleasesData = extractData(results[5], "New Releases");



      const anyUnauthorized = results.some(
        (res) =>
          (res.reason?.status === 401 ||
            res.reason?.response?.status === 401 ||
            res.reason?.message?.includes("401") ||
            res.value?.status === 401 ||
            res.reason?.message?.toLowerCase().includes("unauthorized"))
      );

      if (anyUnauthorized) {
        alert("You must be logged in to view this content. Redirecting to login...");
        console.warn("🔒 401 Unauthorized detected. Redirecting to login...");
        navigate("/", { replace: true });
        return;
      }
      else {
        console.log("results", results)
      }

      // Set the data we DID get, even if some are null
      setDashboardData({
        songs,
        artists,
        playlists,
        globalSongs,
        globalAlbum,
        newReleasesData,
      });
      
    } catch (err) {
      console.error("Critical error in fetchDashboard:", err);
      setError("Failed to fetch dashboard records. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  const { songs, artists, playlists, globalSongs, globalAlbum, newReleasesData } = dashboardData;
  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="text-center mt-5">
        <p className="text-danger mb-3">{error}</p>
        <button className="btn btn-primary" onClick={fetchDashboard}>
          Retry
        </button>
      </div>
    );
  }

  const topTracksList = songs?.items || [];
  const topArtistsList = artists?.items || [];
  const userPlaylistsList = playlists?.items || [];
  const releasesList = newReleasesData?.albums?.items || (Array.isArray(newReleasesData) ? newReleasesData : []);
  const globalSongsList = globalSongs?.tracks?.items || globalSongs?.items || [];

  return (
    <div className="dashboard-wrapper">
      <div className="listContainer">
        <Title text="Your Top Songs" />
        <SongsList updateId={updateId} songs={topTracksList} frosted={false} />
      </div>

      <div className="listContainer">
        <Title text="Your Playlists" />
        <Playlist playlist={userPlaylistsList} />
      </div>

      <div className="listContainer">
        <Title text="Your Top Artists" />
        <ArtistList artists={topArtistsList} />
      </div>

      <div className="lists-grid-container">
        
        {/* Column 1: Top Songs */}
        <div className="list-column-wrapper">
          <Title text="Top Songs (All-Time)" />
          <div className="list-column-card">
            <GlobalList list={globalSongsList} updateId={updateId} />
          </div>
        </div>


        <div className="list-column-wrapper">
          <Title text="New Releases" />
          <div className="list-column-card">
            {releasesList.length > 0 ? (
              <GlobalList list={releasesList} updateId={updateId} />
            ) : (
              <div className="text-center text-muted py-4 small">No new releases available.</div>
            )}
          </div>
        </div>

        {/* Column 3: Featured Albums */}
        <div className="list-column-wrapper">
          <Title text="Featured Albums" />
          <div className="list-column-card">
            {globalAlbum ? (
              <GlobalList list={globalAlbum.tracks.items} updateId={updateId} />
            ) : (
              <div className="text-center text-muted py-4 small">No featured albums available.</div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Start;