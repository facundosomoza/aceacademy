import React, { useState } from "react";

import { Link } from "react-router-dom";

import { useHistory } from "react-router-dom";

import image1 from "./Images/logo_grande.png";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import useLogin from "../hooks/useLogin";

export default function Home({ app }) {
  const history = useHistory();

  useLogin(app);

  const handleJugador = () => {
    history.push("/createaccountplayer");
  };

  const handleScout = () => {
    history.push("/createaccountscout");
  };

  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Col xs={4}>
          <img className="home-logo img-fluid" src={image1}></img>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center">
          <Link className="btn btn-primary mx-2" onClick={handleJugador}>
            ¿Eres Jugador?
          </Link>
          <Link className="btn btn-secondary mx-2" onClick={handleScout}>
            ¿Eres Scout?
          </Link>
        </Col>
      </Row>
    </Container>
  );
}
