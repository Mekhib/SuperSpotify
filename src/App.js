import './css/App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Start from "./components/Start";
import Player from './components/Player.js';
import  LoggedIn  from './components/LoggedIn';
import Nav from './components/navbar';
import Sidebar from './components/Sidebar';
import UserTracks from './components/UserTracks';
import PlayListScreen from './components/PlayListScreen';
import AlbumScreen from "./components/AlbumScreen";
import ArtistScreen from "./components/ArtistScreen";
import {useState} from "react"
import Search from './components/Search';


function App() {
  const [spotifyID, updateId] = useState(undefined)
   const [artsistID, updateArtistId] = useState(undefined);
  return (
    <Router>
      <Nav />
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          exact
          path="/start"
          element={
            <LoggedIn>
              <Start updateId={updateId} />
            </LoggedIn>
          }
        />
        <Route
          path="/artist/:id"
          element={
            <LoggedIn>
              <ArtistScreen
                updateId={updateId}
                updateArtistId={updateArtistId}
              />
            </LoggedIn>
          }
        />
        <Route
          path="/tracks"
          element={
            <LoggedIn>
              <UserTracks updateId={updateId} />
            </LoggedIn>
          }
        />
        <Route
          path="/playlist/:id"
          element={
            <LoggedIn>
              <PlayListScreen updateId={updateId} />
            </LoggedIn>
          }
        />
        <Route
          path="/album/:id"
          element={
            <LoggedIn>
              <AlbumScreen updateId={updateId} />
            </LoggedIn>
          }
        />
        <Route
          path="/search"
          element={
            <LoggedIn>
              <Search/>
            </LoggedIn>
          }
        />
      </Routes>
      <Player spotifyID={spotifyID} updateId={updateId} />
    </Router>
  );
}

export default App;
