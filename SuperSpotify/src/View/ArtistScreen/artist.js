import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Image from "react-bootstrap/Image";
import { artistAPI } from "./index.js";
import FrostedGlassView from "../../components/FrostedGlassView.js";
import SongsList from "../../components/SongsListView.js";
import LoadingSpinner from "../../components/LoadingSpinner.js";
import "../../css/artistScreen.css";
import "../../css/text.scss";
import Events from "../../components/events.js";

function ArtistScreen() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Spotify Data State
  const [artistViewData, setArtistViewData] = useState({
    artist: null,
    topSongs: null,
    albums: null,
    error: false,
  });

  // External API States
  const [artistBio, setArtistBio] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleAlbumClick = (albumId) => {
    navigate(`/album/${albumId}`, { state: { artData: artistViewData.artist } });
  };

  // 1. Fetch Spotify Data
  useEffect(() => {
    let isMounted = true;

    const fetchArtistData = async () => {
      try {
        setLoading(true); 
        const data = await artistAPI.getFullArtistProfile(id);

        if (isMounted) {
          if (data && data.artist) {
            setArtistViewData({
              artist: data.artist,
              topSongs: data.artistSongs,       
              albums: data.artistAlbums,        
              error: false,
            });
          } else {
            setArtistViewData(prev => ({ ...prev, error: true }));
          }
        }
      } catch (err) {
        console.error("Failed to fetch full artist profile:", err);
        if (isMounted) {
          setArtistViewData(prev => ({ ...prev, error: true }));
        }
      } finally {
        if (isMounted) {
          setLoading(false); 
        }
      }
    };

    if (id) {
      fetchArtistData();
    }

    return () => {
      isMounted = false;
    };
  }, [id, navigate]);

  // 2. Fetch Wikipedia Biography & SeatGeek Events
  useEffect(() => {
    const fetchExternalData = async () => {
      if (!artistViewData.artist?.name) return;

      const artistName = artistViewData.artist.name;

      // --- WIKIPEDIA API ---
      try {
        const formattedName = encodeURIComponent(artistName);
        const wikiUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro=true&explaintext=true&titles=${formattedName}&origin=*`;
        
        const wikiRes = await fetch(wikiUrl);
        const wikiData = await wikiRes.json();
        
        const pages = wikiData.query.pages;
        const pageId = Object.keys(pages)[0];
        
        if (pageId !== "-1" && pages[pageId].extract) {
          const shortBio = pages[pageId].extract.split('\n')[0]; 
          setArtistBio(shortBio);
        } else {
          setArtistBio("Biography not available at this time.");
        }
      } catch (err) {
        console.error("Failed to fetch biography:", err);
      }

      // --- SEATGEEK API (Live Events) ---
      try {
        // Replace with your actual SeatGeek Client ID
        const clientId = "MTM0OTMwODJ8MTc4NDg1NzM1Mi4yMjM5NTI1"; 
        const seatGeekUrl = `https://api.seatgeek.com/2/events?q=${encodeURIComponent(artistName)}&client_id=${clientId}`;
        
        const sgRes = await fetch(seatGeekUrl);
        const sgData = await sgRes.json();
        
        if (sgData.events && sgData.events.length > 0) {
          // Filter out generic events to try and match the exact artist, then take top 5
          const artistEvents = sgData.events.filter(event => 
            event.performers.some(p => p.name.toLowerCase() === artistName.toLowerCase())
          ).slice(0, 5);
          
          setEvents(artistEvents);
        }
      } catch (err) {
        console.error("Failed to fetch events:", err);
      }
    };

    fetchExternalData();
  }, [artistViewData.artist]);

  const { artist, topSongs, albums, error } = artistViewData;

  if (loading) return <LoadingSpinner />;
  
  if (error || !artist) {
    return <div className="text-center mt-5 text-white">Error loading artist data.</div>;
  }

  return (
    <FrostedGlassView BgImage={artist.images?.[0]?.url}>
      <div className="content-overlay">
        
        <div className="artistImage">
          <Image
            src={artist.images?.[0]?.url}
            className="artScrnImg"
            alt={artist.name}
          />
          <div className="artist-header-info">
            <h1 className="artNme">{artist.name}</h1>
            <p className="artFollow">
              {artist.followers?.total?.toLocaleString()} Followers
            </p>
          </div>
        </div>

        {/* Biography Section */}
        {artistBio && (
          <div className="artlistContainer bio-container">
            <div className="title">
              <h2 className="titleText">About</h2>
            </div>
            <p className="artist-bio-text">{artistBio}</p>
          </div>
        )}

  

        <div className="artlistContainer">
          <div className="title">
            <h2 className="titleText">Top Songs</h2>
          </div>
          <SongsList
            frosted={true}
            updateId={handleAlbumClick} 
            color={"white"}
            userData={topSongs}
            songs={topSongs?.tracks}
          />
        </div>

        <div className="artlistContainer" style={{ marginBottom: "50px" }}>
          <div className="title">
            <h2 className="titleText">Albums</h2>
          </div>
          <SongsList
          frosted={true}
            updateId={handleAlbumClick}
            artAlbums={albums}
            color={"white"}
            userData={albums}
            songs={albums?.items}
          />
        </div> 
             
        {events.length > 0 && (
       <Events events={events}/>
        )}
      </div>
    </FrostedGlassView>
  );
}

export default ArtistScreen;