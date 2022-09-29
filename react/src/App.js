import React, { useState } from "react";

import Home from "./Components/Home";
import CreateAccountPlayer from "./Components/Player/CreateAccountPlayer";
import CreateAccountScout from "./Components/Scout/CreateAccountScout";
import ProfilePlayer from "./Components/Player/ProfilePlayer";

import FormNewPlayer from "./Components/Player/FormNewPlayer";
import CardPlayer from "./Components/Player/CardPlayer";
import ScoutMenu from "./Components/ScoutMenu";
import FormNewScout from "./Components/Scout/FormNewScout";

import { initializeApp } from "firebase/app";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import { useHistory } from "react-router-dom";
import ProfileScout from "./Components/Scout/ProfileScout";
import PlayerMenu from "./Components/PlayerMenu";

export default function App() {
  const history = useHistory();

  const firebaseConfig = {
    apiKey: "AIzaSyBzsM7w8Zt4mqzek7WFgArpGkcW3iZkCtM",
    authDomain: "fir-auth-ffda7.firebaseapp.com",
    projectId: "fir-auth-ffda7",
    storageBucket: "fir-auth-ffda7.appspot.com",
    messagingSenderId: "347416012238",
    appId: "1:347416012238:web:e68193928287d979bf379f",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const [playerName, setPlayerName] = useState("");
  const [playerSurname, setPlayerSurname] = useState("");
  const [playerEmail, setPlayerEmail] = useState("");
  const [playerId, setPlayerId] = useState(null);

  const [newScout, setNewScout] = useState("");

  const [profileUserPlayer, setProfileUserPlayer] = useState([]);

  const handleFullName = (name, surname, email, id) => {
    setPlayerName(name);
    setPlayerSurname(surname);
    setPlayerEmail(email);
    setPlayerId(id);
  };

  const handleOldPlayer = (email) => {
    setPlayerEmail(email);
  };

  const handleNewScout = (newScout) => {
    console.log("New scout", newScout);
    setNewScout(newScout);
  };

  const handleProfilePlayer = (userProf) => {
    setProfileUserPlayer(userProf);
  };

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Home app={app}></Home>
          </Route>
          <Route path="/createaccountplayer">
            <CreateAccountPlayer
              app={app}
              handleOldPlayer={handleOldPlayer}
            ></CreateAccountPlayer>
          </Route>
          <Route path="/createaccountscout">
            <CreateAccountScout app={app}></CreateAccountScout>
          </Route>
          <Route path="/profileplayer">
            <ProfilePlayer></ProfilePlayer>
          </Route>
          <Route path="/formnewplayer">
            <FormNewPlayer
              app={app}
              handleFullName={handleFullName}
              handleProfilePlayer={handleProfilePlayer}
            ></FormNewPlayer>
          </Route>
          <Route path="/formnewscout">
            <FormNewScout
              app={app}
              handleNewScout={handleNewScout}
            ></FormNewScout>
          </Route>
          <Route path="/cardplayer">
            <CardPlayer
              playerName={playerName}
              playerSurname={playerSurname}
              playerEmail={playerEmail}
              playerId={playerId}
              app={app}
            ></CardPlayer>
          </Route>

          <Route path="/scoutmenu">
            <ScoutMenu scoutEmail={newScout} app={app}></ScoutMenu>
          </Route>

          <Route path="/playermenu">
            <PlayerMenu playerEmail={playerEmail} app={app} />
          </Route>

          <Route path="/profilescout">
            <ProfileScout></ProfileScout>
          </Route>

          <Route path="/profileplayer">
            <ProfilePlayer
              profileUserPlayer={profileUserPlayer}
            ></ProfilePlayer>
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}
