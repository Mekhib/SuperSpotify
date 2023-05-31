import React from "react"
import { Navbar, Container, Button } from "react-bootstrap";

function Nav() {
return (
  <Navbar bg="light" variant="light">
    <Container>
      <Navbar.Brand href="http://localhost:3000/">
        <img
          alt=""
          src="https://e1.pngegg.com/pngimages/893/800/png-clipart-spotify-for-os-x-el-capitan-spotify-icon.png"
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{" "}
        Super Spotify
      </Navbar.Brand>
    </Container>
  </Navbar>
);
}

export default Nav