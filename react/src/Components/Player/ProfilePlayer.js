import React from "react";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavigationBar from "../common/NavigationBar";

import {
  getFirestore,
  addDoc,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";

export default function ProfilePlayer({ profileUserPlayer }) {
  const handleGuardarCambios = () => {
    console.log("profile player");
    console.log(profileUserPlayer);
  };

  return (
    <>
      <Container>
        <NavigationBar title="Perfil del Jugador" />
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Apellido</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Fecha de Nacimiento</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Sexo</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Club Actual</Form.Label>
              <Form.Control type="text" />
            </Form.Group>

            <Form.Group>
              <Form.Label>País</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Localidad</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Domicilio</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Número de Teléfono</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Descripcion de tu perfil</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
            <Form.Control className="mt-4" type="file" />
            <Button variant="primary" onClick={handleGuardarCambios}>
              Guardar Cambios
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}
