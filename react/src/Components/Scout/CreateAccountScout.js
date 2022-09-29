import React, { useState } from "react";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/esm/Container";

import Swal from "sweetalert2";

import { Link } from "react-router-dom";

import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

import {
  getDocs,
  getFirestore,
  collection,
  where,
  query,
  doc,
  getDoc,
} from "firebase/firestore";

import { useHistory } from "react-router-dom";
import NavigationBar from "../common/NavigationBar";

export default function CreateAccountScout({ app }) {
  const [scoutEmail, setScoutEmail] = useState("");
  const [scoutPassword, setScoutPassword] = useState("");

  const [message, setMessage] = useState("");

  const history = useHistory();

  const handleScoutEmail = (event) => {
    setScoutEmail(event.target.value);
  };

  const handleScoutPassword = (event) => {
    setScoutPassword(event.target.value);
  };

  const getScout = async () => {
    try {
      const db = getFirestore(app);

      const scoutQuery = query(
        collection(db, "scouts"),
        where("email", "==", scoutEmail)
      );

      const querySnapshot = await getDocs(scoutQuery);

      const scouts = [];

      querySnapshot.forEach(async (doc) => {
        const scout = doc.data();

        scouts.push({ ...scout, id: doc.id });
      });

      console.log("DOC SNAP SCOUT....", scouts[0]);

      return scouts[0];
    } catch (error) {
      console.log(error);
      console.log("Error al obtener los datos del scout");
    }
  };

  const handleIngresar = async () => {
    let valid = true;
    if (scoutEmail.trim().length === 0) {
      setMessage("Debes completar el campo");
      valid = false;
    }
    if (scoutPassword.trim().length === 0) {
      setMessage("Debes completar el campo");
      valid = false;
    }
    if (valid) {
      try {
        const auth = getAuth(app);

        const res = await signInWithEmailAndPassword(
          auth,
          scoutEmail,
          scoutPassword
        );

        console.log("ID LOGIN SCOUT", res);

        await Swal.fire("Has hecho log-in satisfactoriamente");

        const infoScout = await getScout();

        localStorage.setItem(
          "user",
          JSON.stringify({ email: scoutEmail, role: "scout", id: infoScout.id })
        );

        history.push("/scoutmenu");
      } catch (error) {
        Swal.fire("User or Password are not valid");
      }
    }
  };

  return (
    <Container>
      <NavigationBar title="Scout" />
      <Row>
        <Col className="d-flex justify-content-center">
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>Existente Scout</Card.Title>
              <Card.Text>
                <Form>
                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" onChange={handleScoutEmail} />
                    {scoutEmail ? "" : message}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      onChange={handleScoutPassword}
                    />
                    {scoutPassword ? "" : message}
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
              <Card.Title>Nuevo Scout</Card.Title>
              <Link to="/formnewscout">Unete</Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
