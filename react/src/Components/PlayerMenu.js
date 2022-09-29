import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";

import {
  getDocs,
  getFirestore,
  collection,
  where,
  query,
  getDoc,
  doc,
} from "firebase/firestore";

import NavigationBar from "./common/NavigationBar";

import { useHistory } from "react-router-dom";

import useLogin from "../hooks/useLogin.js";

import UserList from "./common/UserList";

export default function PlayerMenu({ app }) {
  const { checkLoggedUser } = useLogin(app);

  const [matches, setMatches] = useState([]);

  const history = useHistory();

  const getScout = async (id) => {
    try {
      const db = getFirestore(app);

      const scoutDoc = doc(db, "scouts", id);

      const docSnap = await getDoc(scoutDoc);

      return docSnap.data();
    } catch {
      console.log("Error al obtener los datos del scout");
    }
  };

  const getMatches = async (loggedPlayer) => {
    try {
      const db = getFirestore(app);

      const playerId = loggedPlayer.id;

      console.log("LOGGED PLAYER...", loggedPlayer);

      const matchesCollection = query(
        collection(db, "matches"),
        where("playerId", "==", playerId)
      );

      const querySnapshot = await getDocs(matchesCollection);

      const newScoutsIds = [];

      querySnapshot.forEach(async (doc) => {
        const matchDoc = doc.data();

        newScoutsIds.push({ scoutId: matchDoc.scoutId, match: matchDoc.match });
      });

      const newScouts = [];

      for (let { scoutId, match } of newScoutsIds) {
        const scoutData = await getScout(scoutId);

        newScouts.push({ ...scoutData, id: scoutId, match });
      }

      console.log("NEW SCOUTS...", newScouts);

      setMatches(newScouts);
    } catch {
      console.log("Error al obtener los players");
    }
  };

  useEffect(() => {
    const loggedPlayer = checkLoggedUser();

    if (loggedPlayer) {
      getMatches(loggedPlayer);
    } else {
      history.push("/");
    }
  }, []);

  console.log("Player Menu loaded");

  return (
    <Container>
      <NavigationBar title="Decisiones de Scouts" />

      <UserList users={matches} app={app} mode="player" />
    </Container>
  );
}
