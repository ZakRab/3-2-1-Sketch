import { useContext } from "react";
import { LobbyContext } from "../context/LobbyContext";
import { useNavigate } from "react-router-dom";

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
    if (lobbyKey && displayName) {
      setActivePlayer({ displayName: displayName, isHost: false });
      navigate(`/lobby/${lobbyKey}`);
    } else {
      console.log("please enter a display name and a lobby key");
    }
  }
  function lobbyCreater() {
    if (lobbyKey && displayName) {
      setActivePlayer({ displayName: displayName, isHost: true });
      navigate(`/lobby/${lobbyKey}`);
    } else {
      console.log("please enter a display name and a lobby key");
    }
  }
  return (
    <>
      <h1>Welcome to drawing game</h1>
      <div>
        <label htmlFor="lobbyKey">Enter the Lobby Key</label>
        <input
          id="lobbyKey"
          type="text"
          value={lobbyKey}
          onChange={(e) => setLobbyKey(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="displayName">Enter a Display Name</label>
        <input
          id="displayName"
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
      </div>

      <button onClick={() => lobbyJoiner()}>Join Lobby as participant</button>
      <button onClick={() => lobbyCreater()}>Create Lobby as Host</button>
    </>
  );
};

export default Main;
