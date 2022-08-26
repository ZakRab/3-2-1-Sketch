import { useContext, useState } from "react";
import { LobbyContext } from "../context/LobbyContext";
import { useNavigate } from "react-router-dom";
import randomString from "random-string";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Swal from "sweetalert2";

const Main = () => {
  const {
    lobbyKey,
    setLobbyKey,
    activePlayer,
    setActivePlayer,
    displayName,
    setDisplayName,
  } = useContext(LobbyContext);
  const navigate = useNavigate();

  function lobbyJoiner() {
    if (lobbyKey.length == 4) {
      setIsInLobby(true);
    } else {
      Swal.fire({
        icon: "error",
        title: "Lobby ID",
        body: "Please enter 4 digit Lobby ID",
        footer: "or create your own lobby",
      });
    }
  }

  function lobbyEnter() {
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
    <div className="center">
      <h1>Welcome to drawing game</h1>
      {!isInLobby && (
        <div>
          <TextField
            label="Lobby ID"
            id="lobbyKey"
            type="text"
            value={lobbyKey}
            onChange={(e) => setLobbyKey(e.target.value)}
          />
        </div>
      )}
      {(isInLobby || isHosting) && (
        <div>
          <TextField
            id="displayName"
            type="text"
            label="Nickname"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </div>
      )}
      {!isInLobby && (
        <Button variant="contained" onClick={() => lobbyJoiner()}>
          Join
        </Button>
      )}
      {(isInLobby || isHosting) && (
        <Button variant="contained" onClick={() => lobbyEnter()}>
          Enter Lobby
        </Button>
      )}

      {!isHosting && (
        <Button variant="contained" onClick={() => lobbyCreater()}>
          Or Create Lobby as Host
        </Button>
      )}
    </div>
  );
};

export default Main;
