import React, { useCallback, useState } from "react";
export const LobbyContext = React.createContext(null);

export function LobbyProvider(props) {
  const [lobbyKey, setLobbyKey] = useState("1234");
  const [activePlayer, setActivePlayer] = useState({
    displayName: "",
    isHost: false,
    score: 0,
  });
  const [displayName, setDisplayName] = useState("jan");
  const [host, setHost] = useState("");
  const [players, setPlayers] = useState([]);

  return (
    <LobbyContext.Provider
      value={{
        lobbyKey,
        setLobbyKey,
        setActivePlayer,
        activePlayer,
        setHost,
        host,
        setDisplayName,
        displayName,
        setPlayers,
        players,
      }}
    >
      {props.children}
    </LobbyContext.Provider>
  );
}
