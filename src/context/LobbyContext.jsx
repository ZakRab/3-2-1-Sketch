import React, { useCallback, useState } from "react";
export const LobbyContext = React.createContext(null);

export function LobbyProvider(props) {
  const [lobbyKey, setLobbyKey] = useState("1234");
  const [activePlayer, setActivePlayer] = useState({
    displayName: "",
    isHost: false,
  });
  const [displayName, setDisplayName] = useState("jan");
  const [host, setHost] = useState("");
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
      }}
    >
      {props.children}
    </LobbyContext.Provider>
  );
}
