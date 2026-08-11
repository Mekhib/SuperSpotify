import './css/App.css';
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import Home from './View/HomeScreen/home.js';
import Start from "./View/StartScreen/start.js";
import Player from './View/PlayerScreen/MusicPlayer.js';
import LoggedIn  from './components/LoggedIn';
import UserTracks from './View/TracksScreen/userTracks.js';
import PlayListScreen from './View/PlayListScreen/playlist.js';
import AlbumScreen from "./View/AlbumScreen/album.js";
import ArtistScreen from "./View/ArtistScreen/artist.js";
import NowPlayingScreen from './View/NowPlayingScreen/nowPlaying.js';
import About from './View/About/about.js';
import UserPlaylistsScreen from './View/UserPlayListScreen/UserPlaylistsScreen.js';
import Search from './View/SearchScreen/search.js';
import AppNavbar from './components/AppNavBar';


const ProtectedLayout = () => {
  return (
    <LoggedIn>
      <AppNavbar />
      <Outlet /> 
        <Player />
    </LoggedIn>
  );
};

function App() {


  return (
    <Router>
    
      <Routes>

        <Route path="/" element={<Home />} />

        <Route element={<ProtectedLayout />}>
          <Route
            path="/start"
            element={<Start/>}
          />
          <Route
            path="/artist/:id"
            element={
              <ArtistScreen
              />
            }
          />
          <Route
            path="/tracks"
            element={<UserTracks />}
          />
          <Route
            path="/playlist/:id"
            element={<PlayListScreen />}
          />
          <Route
            path="/album/:id"
            element={<AlbumScreen />}
          />
          <Route
            path="/search"
            element={<Search />}
          />
                 <Route 
        path="/user/playlists"
        element={<UserPlaylistsScreen/>}
        />
                    <Route 
        path="/about"
        element={<About/>}
        />
                    <Route 
        path="/now-playing"
        element={<NowPlayingScreen/>}
        />
        </Route>
 
      </Routes>

    
    </Router>
  );
}

export default App;