import React from "react";
import { Navbar, Container, Nav as BootstrapNav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

// Icons
import { FiHome, FiLogOut } from "react-icons/fi";
import { FaList, FaSearch, FaMusic, FaInfo } from "react-icons/fa";


const AppNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/auth");
  };

  return (
    <Navbar 
      expand="md" 
      sticky="top" 
      style={{ 
        backgroundColor: "rgba(248, 249, 250, 0.85)", 
        WebkitBackdropFilter: "blur(10px)", 
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(0,0,0,0.05)"
      }}
    >
      <Container>
        {/* Brand / Logo */}
        <Navbar.Brand as={Link} to="/start" className="d-flex align-items-center">
          <img
            alt="Super Spotify Logo"
            src="https://e1.pngegg.com/pngimages/893/800/png-clipart-spotify-for-os-x-el-capitan-spotify-icon.png"
            width="30"
            height="30"
            className="d-inline-block align-top me-2"
          />
          <span style={{ fontWeight: "600", letterSpacing: "-0.5px", color: "#191414" }}>
            Super Spotify
          </span>
        </Navbar.Brand>

        {/* Mobile Hamburger Menu Toggle */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0 shadow-none" />

        {/* Navigation Links */}
        <Navbar.Collapse id="basic-navbar-nav">
          <BootstrapNav className="ms-auto align-items-center">
            
            <BootstrapNav.Link as={Link} to="/start" className="d-flex align-items-center gap-2 px-3 text-dark">
              <FiHome size={18} /> 
              <span className="d-md-none d-lg-inline">Home</span>
            </BootstrapNav.Link>
            
            <BootstrapNav.Link as={Link} to="/tracks" className="d-flex align-items-center gap-2 px-3 text-dark">
              <FaMusic size={18} /> 
              <span className="d-md-none d-lg-inline">Tracks</span>
            </BootstrapNav.Link>

            <BootstrapNav.Link as={Link} to="/user/playlists" className="d-flex align-items-center gap-2 px-3 text-dark">
              <FaList size={18} /> 
              <span className="d-md-none d-lg-inline">Playlists</span>
  </BootstrapNav.Link>
            
            <BootstrapNav.Link as={Link} to="/search" className="d-flex align-items-center gap-2 px-3 text-dark">
              <FaSearch size={18} /> 
              <span className="d-md-none d-lg-inline">Search</span>
            </BootstrapNav.Link>
            
  
            
            {/* Logout Button */}
            <BootstrapNav.Link onClick={handleLogout} className="d-flex align-items-center gap-2 px-3 text-danger" style={{ cursor: "pointer" }}>
              <FiLogOut size={18} /> 
              <span className="d-md-none d-lg-inline">Logout</span>
            </BootstrapNav.Link>

                       <BootstrapNav.Link as={Link} to="/about" className="d-flex align-items-center gap-2 px-3 text-dark">
              <FaInfo size={18} /> 
              <span className="d-md-none d-lg-inline">About</span>
  </BootstrapNav.Link>

          </BootstrapNav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;