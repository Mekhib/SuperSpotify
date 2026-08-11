import React, { useRef, useCallback } from "react";
import Table from "react-bootstrap/Table";
import Image from "react-bootstrap/Image";
import LoadingSpinner from "./LoadingSpinner";
import "../css/table.css";

function TableView({ data, updateId, onLoadMore, hasMore, isFetchingNext }) {
  console.log(data);
  const observer = useRef();

  const lastTrackElementRef = useCallback((node) => {
    if (isFetchingNext) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        onLoadMore();
      }
    }, { rootMargin: "150px" }); 
    
    if (node) observer.current.observe(node);
  }, [isFetchingNext, hasMore, onLoadMore]);

  const tracks = data?.items || data?.body?.tracks?.items || data?.body?.items || data;

console.log("tracks", tracks);

  function convert(millis) {
    if (!millis) return "0:00";
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return seconds == 60
      ? minutes + 1 + ":00"
      : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  if (!Array.isArray(tracks)) {
    return <LoadingSpinner />;
  }

  return (
    <div className="table-responsive px-3 px-md-4">
      <Table hover striped size="sm" className="align-middle custom-track-table">
        <thead>
          <tr>
            <th>Song</th>
            <th className="d-none d-md-table-cell">Artist</th>
            <th className="d-none d-lg-table-cell">Album</th>
            <th className="text-end">Time</th>
          </tr>
        </thead>
        <tbody>
          {tracks.map((item, index) => {
            const track = item.track || item;
            if (!track) return null;

            const imageUrl = track.album?.images?.[0]?.url || "";
            const artistNames = track.artists?.map((artist) => artist.name).join(", ") || "";
            const albumName = track.album?.name || "";
            const isLastElement = tracks.length === index + 1;

            return (
              <tr 
                key={track.id || index} 
                onClick={() => updateId && updateId(track.uri || track.id)}
                style={{ cursor: "pointer" }}
                ref={isLastElement ? lastTrackElementRef : null}
              >
                <td className="py-2">
                  <div className="d-flex align-items-center gap-3">
                    {imageUrl && (
                      <Image
                        src={imageUrl}
                        rounded
                        style={{ width: "42px", height: "42px", objectFit: "cover" }}
                      />
                    )}
                    <div>
                      <div className="fw-semibold text-dark text-truncate" style={{ maxWidth: "250px" }}>
                        {track.name}
                      </div>
                      <div className="text-muted small d-md-none text-truncate" style={{ maxWidth: "200px" }}>
                        {artistNames}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="text-muted small d-none d-md-table-cell">{artistNames}</td>
                <td className="text-muted small d-none d-lg-table-cell">{albumName}</td>
                <td className="text-muted small text-end">{convert(track.duration_ms)}</td>
              </tr>
            );
          })}
          
          {/* Inline Loading Spinner for next page */}
          {isFetchingNext && (
            <tr>
              <td colSpan="4" className="text-center py-4">
                <LoadingSpinner />
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      
      {!hasMore && tracks.length > 0 && (
         <div className="text-center text-muted small py-4">End of tracks.</div>
      )}
    </div>
  );
}

export default TableView;