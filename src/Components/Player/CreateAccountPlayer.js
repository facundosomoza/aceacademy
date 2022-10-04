import React, { useEffect, useState } from "react";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/esm/Container";

import {
  getDocs,
  getFirestore,
  collection,
  where,
  query,
} from "firebase/firestore";

import Swal from "sweetalert2";

import { Link, useHistory } from "react-router-dom";

import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

import NavigationBar from "../common/NavigationBar";

import useLogin from "../../hooks/useLogin";

export default function CreateAccount({ app, handleOldPlayer }) {
  const history = useHistory();

  useLogin(app);

  const [jugadorEmail, setJugadorEmail] = useState("");
  const [jugadorPassword, setJugadorPassword] = useState("");

  const [message, setMessage] = useState("");

  const handleJugadorEmail = (event) => {
    setJugadorEmail(event.target.value);
  };

  const handleJugadorPassword = (event) => {
    setJugadorPassword(event.target.value);
  };

  const getPlayer = async () => {
    try {
      const db = getFirestore(app);

      const playerQuery = query(
        collection(db, "players"),
        where("email", "==", jugadorEmail)
      );

      const querySnapshot = await getDocs(playerQuery);

      const players = [];

      querySnapshot.forEach(async (doc) => {
        const player = doc.data();

        players.push({ ...player, id: doc.id });
      });

      console.log("DOC SNAP PLAYER....", players[0]);

      return players[0];
    } catch (error) {
      console.log(error);
      console.log("Error al obtener los datos del jugador");
    }
  };

  const handleIngresar = async () => {
    let valid = true;
    if (jugadorEmail.trim().length === 0) {
      setMessage("Debes completar el campo");
      valid = false;
    }
    if (jugadorPassword.trim().length === 0) {
      setMessage("Debes completar el campo");
      valid = false;
    }
    if (valid) {
      try {
        const auth = getAuth(app);

        const res = await signInWithEmailAndPassword(
          auth,
          jugadorEmail,
          jugadorPassword
        );

        await Swal.fire("Has hecho log-in satisfactoriamente");

        handleOldPlayer(jugadorEmail);

        const player = await getPlayer();

        localStorage.setItem(
          "user",
          JSON.stringify({
            email: jugadorEmail,
            role: "player",
            id: player.id,
          })
        );

        history.push("/playermenu");
      } catch (error) {
        Swal.fire("Usuario o password no validos");
      }
    }
  };

  return (
    <>
      <Container>
        <NavigationBar title="Jugador" />
        <Row>
          <Col className="d-flex justify-content-center">
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>Existente Jugador</Card.Title>
                <Card.Text>
                  <Form>
                    <Form.Group>
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="text" onChange={handleJugadorEmail} />
                      {jugadorEmail ? "" : message}
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        onChange={handleJugadorPassword}
                      />
                      {jugadorPassword ? "" : message}
                    </Form.Group>
                  </Form>
                </Card.Text>
                <Button variant="primary" onClick={handleIngresar}>
                  Ingresar
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col className="d-flex justify-content-center">
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>Nuevo Jugador</Card.Title>
                <Link to="/formnewplayer">UNETE</Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
