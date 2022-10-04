import React from "react";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import NavigationBar from "../common/NavigationBar";

export default function ProfileScout() {
  const handleAccept = () => {
    console.log("hola");
  };

  return (
    <Container>
      <NavigationBar title="Perfil de Scout"></NavigationBar>
      <Row className="justify-content-center">
        <Col xs={9} sm={8} md={7} lg={5} xl={5} className="bg-light">
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Nombre</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Apellido</Form.Label>
            <Form.Control type="text" />
          </Form.Group>

          <Form.Group>
            <Form.Label>Pais</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Localidad</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Organizacion</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Telefono</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" />
          </Form.Group>
          <Button variant="primary" onClick={handleAccept}>
            Guardar Cambios
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
