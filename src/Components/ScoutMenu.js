import React, { useEffect, useState } from "react";

import { useHistory } from "react-router-dom";

import NavigationBar from "./common/NavigationBar";
import Container from "react-bootstrap/Container";

import UserList from "./common/UserList";

import {
  getDocs,
  getFirestore,
  collection,
  where,
  query,
  doc,
  getDoc,
} from "firebase/firestore";

import useLogin from "../hooks/useLogin";
import { NAVBAR_MODES } from "../utils/constants";
import ScoutMatcher from "./Scout/ScoutMatcher";

export default function ScoutMenu({ app }) {
  const [scoutMode, setScoutMode] = useState(NAVBAR_MODES.SCOUT_NORMAL);

  const [users, setUsers] = useState([]);

  const { checkLoggedUser } = useLogin(app);

  const history = useHistory();

  const getPlayer = async (id) => {
    try {
      const db = getFirestore(app);

      const playerDoc = doc(db, "players", id);

      const docSnap = await getDoc(playerDoc);

      return docSnap.data();
    } catch {
      console.log("Error al obtener los datos del player");
    }
  };

  const getMatches = async () => {
    try {
      const db = getFirestore(app);

      const scoutId = checkLoggedUser().id;

      const playersCollection = query(
        collection(db, "matches"),
        where("scoutId", "==", scoutId)
      );

      const querySnapshot = await getDocs(playersCollection);

      const newUsersIds = [];

      querySnapshot.forEach(async (doc) => {
        const userDoc = doc.data();

        newUsersIds.push({ playerId: userDoc.playerId, match: userDoc.match });
      });

      const newUsers = [];

      for (let { playerId, match } of newUsersIds) {
        const playerData = await getPlayer(playerId);

        newUsers.push({ ...playerData, id: playerId, match });
      }

      console.log("NEW USERS...", newUsers);

      setUsers(newUsers);
    } catch {
      console.log("Error al obtener los players");
    }
  };

  useEffect(() => {
    if (checkLoggedUser()) {
      getMatches();
    } else {
      history.push("/");
    }
  }, []);

  const handleScoutModeChange = (mode) => {
    setScoutMode(mode);
  };

  return (
    <Container>
      <NavigationBar
        mode={scoutMode}
        onChangeScoutMode={handleScoutModeChange}
      />

      {scoutMode === NAVBAR_MODES.SCOUT_NORMAL ? (
        <UserList users={users} app={app} mode="scout" />
      ) : (
        <ScoutMatcher app={app} matches={users} refreshMatches={getMatches} />
      )}
    </Container>
  );
}
