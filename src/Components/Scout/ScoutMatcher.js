import React, { useEffect, useState } from "react";

import { getDocs, getFirestore, collection, addDoc } from "firebase/firestore";

import { getStorage, ref, getDownloadURL } from "firebase/storage";

import useLogin from "../../hooks/useLogin";

import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function ScoutMatcher({ app, matches, refreshMatches }) {
  const { checkLoggedUser } = useLogin(app);

  const [suggestions, setSuggestions] = useState([]);

  const [suggestionImageProfile, setSuggestionImageProfile] = useState("");

  const saveMatch = async (playerId, match) => {
    const scoutId = checkLoggedUser().id;

    console.log("El scout ", scoutId, "match", match, "al jugador", playerId);

    const db = getFirestore(app);

    try {
      const matchesCollection = collection(db, "matches");

      const docRef = await addDoc(matchesCollection, {
        scoutId,
        playerId,
        match,
      });

      console.log("Guardado correctamente");

      refreshMatches();
    } catch {
      throw new Error("Error al guardar el match");
    }
  };

  const getPlayers = async () => {
    try {
      const db = getFirestore(app);

      const playersCollection = collection(db, "players");

      const querySnapshot = await getDocs(playersCollection);

      const newPlayers = [];

      querySnapshot.forEach(async (doc) => {
        const playerDoc = doc.data();

        newPlayers.push({ ...playerDoc, id: doc.id });
      });

      console.log("TODOS", newPlayers);
      console.log("MATCHES", matches);

      let playersForSuggest = newPlayers;

      if (matches.length > 0) {
        playersForSuggest = newPlayers.filter(({ id: allId }) => {
          const result = matches.find((matched) => {
            console.log(matched.id, allId, matched.id === allId);
            return matched.id === allId;
          });

          console.log("Result", result);

          return !result;
        });
      }

      console.log("PlayersForSuggest", playersForSuggest);

      setSuggestions(playersForSuggest);
    } catch {
      console.log("Error al obtener los players");
    }
  };

  useEffect(() => {
    getPlayers();
  }, []);

  useEffect(() => {
    console.log("Buscando imagen nueva sugerencia");
    suggestions.length > 0 && getImageProfile();
  }, [suggestions]);

  const getImageProfile = async () => {
    const storage = getStorage(app);

    const profileImageRef = ref(storage, suggestions[0].id);

    const profileImageUrl = await getDownloadURL(profileImageRef);

    console.log(profileImageUrl);

    setSuggestionImageProfile(profileImageUrl);
  };

  const handleMatch = async (match) => {
    const activeSuggestionId = suggestions[0].id;

    try {
      await saveMatch(activeSuggestionId, match);

      const newSuggestions = [...suggestions];

      newSuggestions.shift();

      console.log(newSuggestions);

      setSuggestions(newSuggestions);
    } catch {
      console.log("Error al guardar el match. Intente nuevamente...");
    }
  };

  return (
    <>
      {suggestions.length > 0 && (
        <Row className="text-center">
          <Col>Jugadores disponibles: {suggestions.length}</Col>
        </Row>
      )}
      <Row className="justify-content-center w-100 pt-4">
        <Col xs={5}>
          {suggestions.length > 0 ? (
            <>
              <Row className="text-center">
                <Col>
                  {suggestionImageProfile && (
                    <img
                      className="player-img-scout-matcher"
                      src={suggestionImageProfile}
                      alt="Player"
                    />
                  )}
                </Col>
              </Row>

              <Row className="text-center ">
                <Col>
                  <Row>
                    <Col>
                      {`${suggestions[0].name} ${suggestions[0].surname}`}
                    </Col>
                  </Row>
                  <Row className="bg-light ">
                    <Col>{suggestions[0].description}</Col>
                  </Row>
                  <Row>
                    <Col>{suggestions[0].email}</Col>
                  </Row>

                  <Row>
                    <Col>Tel: {suggestions[0].mobileNumber}</Col>
                  </Row>
                </Col>
              </Row>
            </>
          ) : (
            <Row>
              <Col className="text-center bg-warning p-2">
                No hay mas jugadores
              </Col>
            </Row>
          )}
        </Col>
      </Row>

      {suggestions.length > 0 && (
        <Row className="mt-5 bg-light w-100 p-2">
          <Col className="text-center">
            <Button
              onClick={() => handleMatch(false)}
              className="mx-2"
              variant="danger"
            >
              No me gusta
            </Button>
            <Button
              onClick={() => handleMatch(true)}
              className="mx-2"
              variant="success"
            >
              Me gusta
            </Button>
          </Col>
        </Row>
      )}
    </>
  );
}
