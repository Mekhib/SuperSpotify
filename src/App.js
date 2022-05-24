import logo from './logo.svg';
import './css/App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Start from "./components/Start";
import Player from './components/Player.js';
import  LoggedIn  from './components/LoggedIn';
import Nav from './components/navbar';
import Sidebar from './components/Sidebar';
import PlayListScreen from './components/PlayListScreen';
import {useEffect, useState} from "react"
import PlayList from './components/Playlist';


function App() {
  const [spotifyID, updateId] = useState(undefined)
  return (
    <Router>
      <Nav />
      <Sidebar />
      <LoggedIn>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/start" element={<Start updateId={updateId} />} />
        <Route
          path="/playlist/:id"
          element={<PlayListScreen updateId={updateId} />}
        />
      </Routes>
      </LoggedIn>
      <Player spotifyID={spotifyID} updateId={updateId} />
    </Router>
  );
}

export default App;
