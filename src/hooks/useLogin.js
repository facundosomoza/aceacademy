import React, { useEffect } from "react";

import { useHistory } from "react-router-dom";

import {
  getDocs,
  getFirestore,
  collection,
  query,
  where,
} from "firebase/firestore";

export default function useLogin({ app }) {
  const history = useHistory();

  const checkLoggedUser = () => {
    const user = localStorage.getItem("user");

    if (user) {
      const jsonUser = JSON.parse(user);

      return jsonUser;
    } else {
      return null;
    }
  };

  const getPlayer = async (loggedUser) => {
    try {
      const db = getFirestore(app);

      const playersCollection = query(
        collection(db, "players"),
        where("email", "==", loggedUser.email)
      );

      const querySnapshot = await getDocs(playersCollection);

      console.log({ querySnapshot });

      const result = [];

      querySnapshot.forEach((doc) => {
        result.push(doc.data());
      });

      console.log("RESULT...", result);

      if (result.length === 0) {
        return null;
      } else {
        return result[0];
      }
    } catch {
      console.log("Error al obtener los players");
    }
  };

  const getUser = async () => {
    const loggedUser = checkLoggedUser();

    console.log({ loggedUser });

    if (loggedUser) {
      let targetMenu = "";

      if (loggedUser.role === "player") {
        const userData = await getPlayer(loggedUser);
        if (userData && userData.description) {
          targetMenu = "/playermenu";
        } else {
          targetMenu = "/cardplayer";
        }
      } else {
        targetMenu = "/scoutmenu";
      }

      history.push(targetMenu);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return { checkLoggedUser };
}
