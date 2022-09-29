import React, { useEffect, useState } from "react";

import { NAVBAR_MODES } from "../../utils/constants";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";

import logo from "../Images/logo_pequenio.png";

import { useHistory } from "react-router-dom";

export default function NavigationBar({ title, mode, onChangeScoutMode }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  const history = useHistory();

  useEffect(() => {
    const loggedUser = localStorage.getItem("user");

    if (loggedUser) {
      const jsonUser = JSON.parse(loggedUser);

      setUser(jsonUser.email);
      setRole(jsonUser.role);
    } else {
      setUser(null);
      setRole(null);
    }
  }, []);

  const handleClickProfile = () => {
    if (
      role === "player"
        ? history.push("/profileplayer")
        : history.push("/profilescout")
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("user");

    history.push("/");
  };

  const dropDownAccountTitle = `Hola ${
    role === "player" ? "jugador" : "scout"
  } ${user}`;

  const handleVerMasJugadores = () => {
    onChangeScoutMode(NAVBAR_MODES.SCOUT_MATCHING);
  };

  const handleVerMatcheos = () => {
    onChangeScoutMode(NAVBAR_MODES.SCOUT_NORMAL);
  };

  return (
    <Navbar bg="light" expand="lg" className="mb-5">
      <Navbar.Brand href="/">
        <img className="logo-small" src={logo} alt="Logo" />
      </Navbar.Brand>

      {title && <Navbar.Text>{title}</Navbar.Text>}

      {user && (
        <>
          {mode === NAVBAR_MODES.SCOUT_NORMAL && (
            <Button onClick={handleVerMasJugadores}>Ver mas jugadores</Button>
          )}

          {mode === NAVBAR_MODES.SCOUT_MATCHING && (
            <div>
              <Button onClick={handleVerMatcheos}>Ver matches</Button>
            </div>
          )}

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <NavDropdown title={dropDownAccountTitle} id="basic-nav-dropdown">
                {/*    <NavDropdown.Item onClick={handleClickProfile}>
                  My profile
                </NavDropdown.Item> 
                <NavDropdown.Divider />*/}
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </>
      )}
    </Navbar>
  );
}
