import React, { useCallback, useState } from "react";
export const LobbyContext = React.createContext(null);

export function LobbyProvider(props) {
  const [lobbyKey, setLobbyKey] = useState("");
  const [activePlayer, setActivePlayer] = useState({
    displayName: "",
    isHost: false,
    score: 0,
  });
  const [displayName, setDisplayName] = useState("");
  const [players, setPlayers] = useState([]);

  return (
    <LobbyContext.Provider
      value={{
        lobbyKey,
        setLobbyKey,
        setActivePlayer,
        activePlayer,
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
