import { useContext, useState } from "react";
import { LobbyContext } from "../context/LobbyContext";
import { useNavigate } from "react-router-dom";
import randomString from "random-string";

const Main = () => {
  const {
    lobbyKey,
    setLobbyKey,
    activePlayer,
    setActivePlayer,
    host,
    displayName,
    setDisplayName,
    setHost,
  } = useContext(LobbyContext);
  const navigate = useNavigate();

  function lobbyJoiner() {
    if (lobbyKey) {
      setIsInLobby(true);
    } else {
      alert("please enter a lobby key");
    }
  }

  function lobbyEnter(params) {
    setActivePlayer({ displayName: displayName, isHost: isHosting });
    navigate(`/lobby/${lobbyKey}`);
  }

  function lobbyCreater() {
    setLobbyKey(randomString({ length: 4, letters: false }));
    setIsInLobby(true);
    setIsHosting(true);
  }
  const [isInLobby, setIsInLobby] = useState(false);
  const [isHosting, setIsHosting] = useState(false);
  return (
    <>
      <h1>Welcome to drawing game</h1>
      {!isInLobby && (
        <div>
          <input
            placeholder="Lobby ID"
            id="lobbyKey"
            type="text"
            value={lobbyKey}
            onChange={(e) => setLobbyKey(e.target.value)}
          />
        </div>
      )}
      {(isInLobby || isHosting) && (
        <div>
          <input
            id="displayName"
            type="text"
            placeholder="Nickname"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </div>
      )}
      {!isInLobby && <button onClick={() => lobbyJoiner()}>Join</button>}
      {(isInLobby || isHosting) && (
        <button onClick={() => lobbyEnter()}>Enter Lobby</button>
      )}

      {!isHosting && (
        <button onClick={() => lobbyCreater()}>Or Create Lobby as Host</button>
      )}
    </>
  );
};

export default Main;
