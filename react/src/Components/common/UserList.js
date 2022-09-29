import React from "react";
import ScoutListItem from "./ScoutListItem";
import PlayerListItem from "./PlayerListItem";

export default function UserList({ users, app, mode }) {
  return users.map((user) =>
    mode === "scout" ? (
      <ScoutListItem user={user} app={app} />
    ) : (
      <PlayerListItem user={user} app={app} />
    )
  );
}
