import { useContext, useState } from "react";
import { LobbyContext } from "../context/LobbyContext";
import { useNavigate } from "react-router-dom";
import randomString from "random-string";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Swal from "sweetalert2";
import AccountCircle from "@mui/icons-material/AccountCircle";
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
      setIsJoining(true);
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
    if (displayName) {
      setActivePlayer({ displayName: displayName, isHost: isHosting });
      navigate(`/lobby/${lobbyKey}`);
    } else {
      Swal.fire({
        icon: "error",
        title: "No Display Name",
        body: "Please enter a display name",
        footer: "or sign in with google",
      });
    }
  }

  function lobbyCreater() {
    setLobbyKey(randomString({ length: 4, letters: false }));
    setIsInLobby(true);
    setIsHosting(true);
  }
  const [isInLobby, setIsInLobby] = useState(false);
  const [isHosting, setIsHosting] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  return (
    <div className="text-white main-margin margin-center">
      <h1 className="text-center ">Welcome to</h1>
      <h1 className="text-center tracking-in-expand text-large">
        3-2-1 Sketch!
      </h1>
      <div className="d-flex flex-row main-flex padding-top gap margin-bottom">
        <div className="sketch bg-white padding-small">
          {!isInLobby && (
            <div className="text">
              <TextField
                sx={{ border: "1px solid white", borderRadius: 2 }}
                label="Lobby PIN"
                id="lobbyKey"
                type="text"
                value={lobbyKey}
                onChange={(e) => setLobbyKey(e.target.value)}
              />
            </div>
          )}
          {(isInLobby || isHosting) && (
            <div className="text-focus-in">
              <AccountCircle sx={{ color: "action.active", mr: 1, my: 2 }} />
              <TextField
                id="displayName"
                type="text"
                label="Name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>
          )}
          {!isInLobby && (
            <div className="text-center join-button">
              <Button variant="contained" onClick={() => lobbyJoiner()}>
                {"Join".toLowerCase()}
              </Button>
            </div>
          )}
          {(isInLobby || isHosting) && (
            <div className="text-focus-in join-button">
              <Button variant="contained" onClick={() => lobbyEnter()}>
                Enter Lobby
              </Button>
            </div>
          )}
        </div>

        {!isInLobby && <div className="vl"></div>}
        {!isHosting && !isJoining && (
          <div className="padding-top ">
            <Button variant="contained" onClick={() => lobbyCreater()}>
              Create Lobby
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;
