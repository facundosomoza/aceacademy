import React, { useEffect, useState } from "react";

import { getFirestore, doc, updateDoc } from "firebase/firestore";

import { getStorage, ref, uploadBytes } from "firebase/storage";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

import noImageProfile from "../Images/no-image-profile.webp";
import NavigationBar from "../common/NavigationBar";

import useLogin from "../../hooks/useLogin";

export default function CardPlayer({
  playerName,
  playerSurname,
  playerId,
  app,
}) {
  const history = useHistory();

  const [description, setDescription] = useState("");

  const [imageFile, setImageFile] = useState(null);

  const [previewProfileImage, setPreviewProfileImage] =
    useState(noImageProfile);

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const uploadImageProfile = async () => {
    try {
      const storage = getStorage(app);

      const storageRef = ref(storage, playerId);

      await uploadBytes(storageRef, imageFile);

      console.log("Imagen subida correctamente");
    } catch (error) {
      console.log("Error al subir la imagen", error);
    }
  };

  const handleAccept = async () => {
    const db = getFirestore(app);

    try {
      const user = doc(db, "players", playerId);

      //Actualizo la descripcion del player en la bd
      await updateDoc(user, { description });

      //Subo la imagen de perfil del player
      await uploadImageProfile();

      Swal.fire({
        text: "Descripción guardada correctamente en tu perfil",
        icon: "success",
      });
      history.push("/playermenu");
    } catch (error) {
      Swal.fire({
        text: "Error al guardar la descripción en tu perfil",
        icon: "error",
      });
    }
  };

  const handleImageFileChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  const updatePreview = () => {
    imageFile && setPreviewProfileImage(URL.createObjectURL(imageFile));
  };

  useEffect(updatePreview, [imageFile]);

  const { checkLoggedUser } = useLogin(app);

  useEffect(() => {
    if (!checkLoggedUser()) {
      history.push("/");
    }
  }, []);

  return (
    <Container>
      <NavigationBar title="Completa tu perfil" />
      <Row className="justify-content-center">
        <Col xs={4}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>
                Hola {playerName} {playerSurname}
              </Card.Title>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Descripcion de tu perfil</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={6}
                  value={description}
                  onChange={handleDescriptionChange}
                />
              </Form.Group>

              <Form.Control
                className="mt-4"
                type="file"
                onChange={handleImageFileChange}
              />

              <Button className="mt-4" variant="primary" onClick={handleAccept}>
                Aceptar
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={3}>
          <img className="img-fluid" src={previewProfileImage} />
        </Col>
      </Row>
    </Container>
  );
}
