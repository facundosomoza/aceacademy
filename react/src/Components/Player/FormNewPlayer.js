import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/esm/Container";

import Swal from "sweetalert2";

import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

import { getFirestore, addDoc, collection } from "firebase/firestore";

import { useHistory } from "react-router-dom";
import NavigationBar from "../common/NavigationBar";

export default function FormNewPlayer({
  app,
  handleFullName,
  handleProfilePlayer,
}) {
  const history = useHistory();

  const [firstName, setFirstName] = useState("");
  const [firstLastName, setLastName] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [sexo, setSexo] = useState("");
  const [clubActual, setClubActual] = useState("");
  const [country, setCountry] = useState("");
  const [localidad, setLocalidad] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  const [message, setMessage] = useState("");

  const [userProfile, setUserProfile] = useState([]);

  const handleFirstName = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastName = (event) => {
    setLastName(event.target.value);
  };

  const handleFechaNacimiento = (event) => {
    setFechaNacimiento(event.target.value);
  };

  const handleSexo = (event) => {
    setSexo(event.target.value);
  };

  const handleClubActual = (event) => {
    setClubActual(event.target.value);
  };

  const handleCountry = (event) => {
    setCountry(event.target.value);
  };
  const handleLocalidad = (event) => {
    setLocalidad(event.target.value);
  };

  const handleAddress = (event) => {
    setAddress(event.target.value);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleMobileNumber = (event) => {
    setMobileNumber(event.target.value);
  };

  handleProfilePlayer(userProfile);

  const savePlayer = async () => {
    const db = getFirestore(app);

    try {
      const playerCollection = collection(db, "players");

      const user = {
        name: firstName,
        surname: firstLastName,
        fechaNacimiento: fechaNacimiento,
        sexo: sexo,
        clubActual: clubActual,
        localidad: localidad,
        country: country,
        address: address,
        email: email,
        mobileNumber: mobileNumber,
        description: "",
      };
      setUserProfile(user);
      console.log(userProfile);
      const docRef = await addDoc(playerCollection, user);

      return docRef.id;
    } catch {
      Swal.fire({ text: "Error al agregar el jugador", icon: "error" });
    }
  };

  const handleClick = async () => {
    let valid = true;

    if (firstName.trim().length === 0) {
      valid = false;
      setMessage("Debes completar el campo");
    }
    if (firstLastName.trim().length === 0) {
      valid = false;
      setMessage("Debes completar el campo");
    }
    if (fechaNacimiento.trim().length === 0) {
      valid = false;
      setMessage("Debes completar el campo");
    }
    if (sexo.trim().length === 0) {
      valid = false;
      setMessage("Debes completar el campo");
    }
    if (clubActual.trim().length === 0) {
      valid = false;
      setMessage("Debes completar el campo");
    }
    if (country.trim().length === 0) {
      valid = false;
      setMessage("Debes completar el campo");
    }
    if (localidad.trim().length === 0) {
      valid = false;
      setMessage("Debes completar el campo");
    }
    if (address.trim().length === 0) {
      valid = false;
      setMessage("Debes completar el campo");
    }
    if (mobileNumber.trim().length === 0) {
      valid = false;
      setMessage("Debes completar el campo");
    }
    if (email.trim().length === 0) {
      valid = false;
      setMessage("Debes completar el campo");
    }
    if (password.trim().length === 0) {
      valid = false;
      setMessage("Debes completar el campo");
    }
    if (valid) {
      try {
        const auth = getAuth(app);

        const res = await createUserWithEmailAndPassword(auth, email, password);

        const id = await savePlayer();

        Swal.fire({ text: "Jugador agregado correctamente", icon: "success" });

        handleFullName(firstName, firstLastName, email, id);

        localStorage.setItem(
          "user",
          JSON.stringify({ email, role: "player", id })
        );

        history.push("/cardplayer");
        setFirstName("");
        setLastName("");
        setFechaNacimiento("");
        setSexo("");
        setClubActual("");
        setCountry("");
        setLocalidad("");
        setAddress("");
        setEmail("");
        setPassword("");
        setMobileNumber("");
      } catch (err) {
        Swal.fire("Usuario o Password no validos");
      }
    }
  };
  return (
    <>
      <Container>
        <NavigationBar title="Nuevo Jugador" />
        <Row className="justify-content-center">
          <Col xs={9} sm={8} md={7} lg={5} xl={5} className="bg-light">
            <Form>
              <Form.Group>
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  onChange={handleFirstName}
                  value={firstName}
                />
                {firstName ? "" : message}
              </Form.Group>
              <Form.Group>
                <Form.Label>Apellido</Form.Label>
                <Form.Control
                  type="text"
                  onChange={handleLastName}
                  value={firstLastName}
                />
                {firstLastName ? "" : message}
              </Form.Group>
              <Form.Group>
                <Form.Label>Fecha de Nacimiento</Form.Label>
                <Form.Control
                  type="date"
                  onChange={handleFechaNacimiento}
                  value={fechaNacimiento}
                />
                {fechaNacimiento ? "" : message}
              </Form.Group>
              <Form.Group>
                <Form.Label>Sexo</Form.Label>
                <Form.Control type="text" onChange={handleSexo} value={sexo} />
                {sexo ? "" : message}
              </Form.Group>
              <Form.Group>
                <Form.Label>Club Actual</Form.Label>
                <Form.Control
                  type="text"
                  onChange={handleClubActual}
                  value={clubActual}
                />
                {clubActual ? "" : message}
              </Form.Group>

              <Form.Group>
                <Form.Label>País</Form.Label>
                <Form.Control
                  type="text"
                  onChange={handleCountry}
                  value={country}
                />
                {country ? "" : message}
              </Form.Group>
              <Form.Group>
                <Form.Label>Localidad</Form.Label>
                <Form.Control
                  type="text"
                  onChange={handleLocalidad}
                  value={localidad}
                />
                {country ? "" : message}
              </Form.Group>
              <Form.Group>
                <Form.Label>Domicilio</Form.Label>
                <Form.Control
                  type="text"
                  onChange={handleAddress}
                  value={address}
                />
                {address ? "" : message}
              </Form.Group>
              <Form.Group>
                <Form.Label>Número de Teléfono</Form.Label>
                <Form.Control
                  type="text"
                  onChange={handleMobileNumber}
                  value={mobileNumber}
                />
                {mobileNumber ? "" : message}
              </Form.Group>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  onChange={handleEmail}
                  value={email}
                />
                {email ? "" : message}
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  onChange={handlePassword}
                  value={password}
                />
                {password ? "" : message}
              </Form.Group>
            </Form>
            <Button variant="primary" onClick={handleClick}>
              Registrarse
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}
