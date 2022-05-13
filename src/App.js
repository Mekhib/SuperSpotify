import logo from './logo.svg';
import './css/App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Start from "./components/Start";
import Player from './components/Player.js';
import Nav from './components/navbar';
import Sidebar from './components/sidebar';
import {useEffect, useState} from "react"


function App() {
  const [spotifyID, updateId] = useState(undefined)
  return (
    <Router>
      <Nav />
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/start" element={<Start updateId={updateId} />} />
      </Routes>
      <Player spotifyID={spotifyID} updateId={updateId} />
    </Router>
  );
}

export default App;
