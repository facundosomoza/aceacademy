import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/esm/Container";

import Swal from "sweetalert2";

import { Link } from "react-router-dom";

import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

import { getFirestore, addDoc, collection } from "firebase/firestore";

import { useHistory } from "react-router-dom";
import NavigationBar from "../common/NavigationBar";

export default function FormNewScout({ app, handleNewScout, handleEditScout }) {
  const history = useHistory();

  const [firstScoutName, setFirstScoutName] = useState("");
  const [firstScoutLastName, setScoutLastName] = useState("");
  const [countryScout, setCountryScout] = useState("");
  const [localidadScout, setLocalidadScout] = useState("");
  const [organizacionScout, setOrganizacionScout] = useState("");

  const [emailScout, setEmailScout] = useState("");
  const [passwordScout, setPasswordScout] = useState("");
  const [mobileNumberScout, setMobileNumberScout] = useState("");

  const [message, setMessage] = useState("");

  const handleFirstScoutName = (event) => {
    setFirstScoutName(event.target.value);
  };

  const handleScoutLastName = (event) => {
    setScoutLastName(event.target.value);
  };

  const handleCountryScout = (event) => {
    setCountryScout(event.target.value);
  };

  const handleLocalidadScout = (event) => {
    setLocalidadScout(event.target.value);
  };

  const handleOrganizacionScout = (event) => {
    setOrganizacionScout(event.target.value);
  };

  const handleEmailScout = (event) => {
    setEmailScout(event.target.value);
  };

  const handlePasswordScout = (event) => {
    setPasswordScout(event.target.value);
  };

  const handleMobileNumberScout = (event) => {
    setMobileNumberScout(event.target.value);
  };

  const saveScout = async () => {
    const db = getFirestore(app);

    try {
      const scoutCollection = collection(db, "scouts");

      const user = {
        name: firstScoutName,
        surname: firstScoutLastName,
        country: countryScout,
        localidad: localidadScout,
        organizacion: organizacionScout,

        email: emailScout,
        mobileNumber: mobileNumberScout,
      };

      const docRef = await addDoc(scoutCollection, user);

      return docRef.id;
      handleEditScout(firstScoutName);
    } catch {
      Swal.fire({ text: "Error al agregar el scout", icon: "error" });
    }
  };

  const handleClick = async () => {
    let valid = true;

    if (firstScoutName.trim().length === 0) {
      valid = false;
      setMessage("Debes completar el campo");
    }
    if (firstScoutLastName.trim().length === 0) {
      valid = false;
      setMessage("Debes completar el campo");
    }
    if (countryScout.trim().length === 0) {
      valid = false;
      setMessage("Debes completar el campo");
    }
    if (localidadScout.trim().length === 0) {
      valid = false;
      setMessage("Debes completar el campo");
    }
    if (organizacionScout.trim().length === 0) {
      valid = false;
      setMessage("Debes completar el campo");
    }

    if (mobileNumberScout.trim().length === 0) {
      valid = false;
      setMessage("Debes completar el campo");
    }
    if (emailScout.trim().length === 0) {
      valid = false;
      setMessage("Debes completar el campo");
    }
    if (passwordScout.trim().length === 0) {
      valid = false;
      setMessage("Debes completar el campo");
    }
    if (valid) {
      try {
        const auth = getAuth(app);

        const res = await createUserWithEmailAndPassword(
          auth,
          emailScout,
          passwordScout
        );

        const id = await saveScout();

        Swal.fire({ text: "Scout agregado correctamente", icon: "success" });

        localStorage.setItem(
          "user",
          JSON.stringify({ email: emailScout, role: "scout", id })
        );

        handleNewScout(emailScout);
        history.push("/scoutmenu");
        setFirstScoutName("");
        setScoutLastName("");
        setCountryScout("");
        setLocalidadScout("");
        setOrganizacionScout("");
        setEmailScout("");
        setPasswordScout("");
        setMobileNumberScout("");
      } catch (err) {
        Swal.fire("User or Password are not valid");
      }
    }
  };
  return (
    <Container>
      <NavigationBar title="Nuevo Scout" />
      <Row className="justify-content-center">
        <Col xs={9} sm={8} md={7} lg={5} xl={5} className="bg-light">
          <Form>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                onChange={handleFirstScoutName}
                value={firstScoutName}
              />
              {firstScoutName ? "" : message}
            </Form.Group>
            <Form.Group>
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                onChange={handleScoutLastName}
                value={firstScoutLastName}
              />
              {firstScoutLastName ? "" : message}
            </Form.Group>
            <Form.Group>
              <Form.Label>Pais</Form.Label>
              <Form.Control
                type="text"
                onChange={handleCountryScout}
                value={countryScout}
              />
              {countryScout ? "" : message}
            </Form.Group>
            <Form.Group>
              <Form.Label>Localidad</Form.Label>
              <Form.Control
                type="text"
                onChange={handleLocalidadScout}
                value={localidadScout}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Organizacion</Form.Label>
              <Form.Control
                type="text"
                onChange={handleOrganizacionScout}
                value={organizacionScout}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Telefono</Form.Label>
              <Form.Control
                type="text"
                onChange={handleMobileNumberScout}
                value={mobileNumberScout}
              />
              {mobileNumberScout ? "" : message}
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                onChange={handleEmailScout}
                value={emailScout}
              />
              {emailScout ? "" : message}
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                onChange={handlePasswordScout}
                value={passwordScout}
              />
              {passwordScout ? "" : message}
            </Form.Group>

            <Button variant="primary" onClick={handleClick}>
              Registrarse
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
