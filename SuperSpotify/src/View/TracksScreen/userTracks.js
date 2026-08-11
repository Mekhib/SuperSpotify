import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { userService } from "../../services/userService";
import SongsListView from "../../components/SongsListView.js";
import TableView from "../../components/TableView.js";
import Title from "../../components/Title.js";
import LoadingSpinner from "../../components/LoadingSpinner"; 
import "../../css/tracks.css";

function UserTracks({ updateId }) {
  const navigate = useNavigate();
  
  // Data State
  const [recentTracks, setRecentTracks] = useState([]);
  const [savedTracks, setSavedTracks] = useState([]);
  
  // Pagination & Loading State
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isFetchingNext, setIsFetchingNext] = useState(false);

  // Search & Sort State
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("date_desc");


  // 1. Initial Load
  const fetchInitialData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [recentRes, savedRes] = await Promise.allSettled([
        userService.getRecentTracks(),
        userService.getSavedTracks(50, 0) // Fetch first 50
      ]);

      const isUnauthorized = [recentRes, savedRes].some(
        (res) => res.status === "rejected" && res.reason?.status === 401
      );

      if (isUnauthorized) {
        navigate("/", { replace: true });
        return;
      }

      if (recentRes.status === "fulfilled") {
        setRecentTracks(recentRes.value?.items || recentRes.value?.body?.items || []);
      }
      
      if (savedRes.status === "fulfilled") {
        const initialSaved = savedRes.value?.items || savedRes.value?.body?.items || [];
        setSavedTracks(initialSaved);
        if (initialSaved.length < 50) setHasMore(false);
      }
    } catch (err) {
      setError("Failed to load tracks. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  // 2. Load More (Infinite Scroll Trigger)
  const fetchNextSavedTracks = useCallback(async () => {
    if (isFetchingNext || !hasMore) return;
    
    setIsFetchingNext(true);
    try {
      const nextOffset = offset + 50;
      const res = await userService.getSavedTracks(50, nextOffset);
      const newTracks = res?.items || res?.body?.items || [];
      
      if (newTracks.length > 0) {
        setSavedTracks(prev => [...prev, ...newTracks]);
        setOffset(nextOffset);
      }
      
      if (newTracks.length < 50) {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Failed to load more tracks:", err);
    } finally {
      setIsFetchingNext(false);
    }
  }, [offset, isFetchingNext, hasMore]);

  // 3. Process Data (Search & Sort)
  const processedSavedTracks = useMemo(() => {
    if (!savedTracks) return [];
    
    // Filter
    let filtered = savedTracks.filter(item => {
      const track = item.track || item;
      const searchStr = searchQuery.toLowerCase();
      const titleMatch = track.name?.toLowerCase().includes(searchStr);
      const artistMatch = track.artists?.some(a => a.name.toLowerCase().includes(searchStr));
      return titleMatch || artistMatch;
    });

    // Sort
    filtered.sort((a, b) => {
      const trackA = a.track || a;
      const trackB = b.track || b;
      
      switch (sortOption) {
        case "title_asc":
          return (trackA.name || "").localeCompare(trackB.name || "");
        case "artist_asc":
          return (trackA.artists?.[0]?.name || "").localeCompare(trackB.artists?.[0]?.name || "");
        case "duration_desc":
          return (trackB.duration_ms || 0) - (trackA.duration_ms || 0);
        case "date_desc":
        default:
          return new Date(b.added_at || 0).getTime() - new Date(a.added_at || 0).getTime();
      }
    });
    
    return filtered;
  }, [savedTracks, searchQuery, sortOption]);

  if (loading) return <LoadingSpinner />;
  
  if (error) return (
    <div className="text-center mt-5">
      <p className="text-danger mb-3">{error}</p>
      <button className="btn btn-primary" onClick={fetchInitialData}>Retry</button>
    </div>
  );

  return (
    <div className="dashboard-wrapper pb-5">
      <Title text="Most Recent" />
      {recentTracks.length > 0 ? (
        <SongsListView songs={recentTracks} updateId={updateId} />
      ) : (
        <div className="px-4 text-muted">No recent tracks found.</div>
      )}

      <Title text="Saved Tracks" />
      
      {/* Search and Sort Sticky Controls */}
      <div className="sticky-controls-wrapper">
        <div className="controls-container">
          <input 
            type="text" 
            className="apple-search-input" 
            placeholder="Search liked tracks & artists..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select 
            className="apple-sort-select" 
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="date_desc">Recently Added</option>
            <option value="title_asc">Title (A-Z)</option>
            <option value="artist_asc">Artist (A-Z)</option>
            <option value="duration_desc">Longest Duration</option>
          </select>
        </div>
      </div>

      <TableView 
        data={processedSavedTracks} 
        updateId={updateId} 
        onLoadMore={fetchNextSavedTracks}
        hasMore={hasMore && searchQuery === ""}
        isFetchingNext={isFetchingNext}
      />
    </div>
  );
}

export default UserTracks;