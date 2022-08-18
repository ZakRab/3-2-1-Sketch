import React, { useCallback, useState } from "react";
export const LobbyContext = React.createContext(null);

export function LobbyProvider(props) {
  const [lobbyKey, setLobbyKey] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [host, setHost] = useState("");
  return (
    <LobbyContext.Provider
      value={{
        lobbyKey,
        setLobbyKey,
        setDisplayName,
        displayName,
        setHost,
        host,
      }}
    >
      {props.children}
    </LobbyContext.Provider>
  );
}
