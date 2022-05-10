import logo from './logo.svg';
import './css/App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Start from "./components/Start";
import Footer from './components/footer';
import Nav from './components/navbar';
import Sidebar from './components/sidebar';


function App() {
  return (
    <Router>
      <Nav/>
      <Sidebar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route exact path="/start" element={<Start/>} />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
