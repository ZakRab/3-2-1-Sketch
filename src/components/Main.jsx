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
      setActivePlayer({
        displayName: displayName,
        isHost: isHosting,
        score: 0,
        isReady: false,
      });
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
    <>
      <div className="text-white main-margin width-vw margin-center">
        <h1 className="text-center tracking-in-expand text-large">
          3-2-1 Sketch!
        </h1>
        <div className="d-flex main-flex center padding-top gap margin-bottom align-center">
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
              <div className="text-center center join-button">
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

          {!isInLobby && <div className="vl center"></div>}
          {!isHosting && !isJoining && (
            <div className="">
              <Button variant="contained" onClick={() => lobbyCreater()}>
                Create Lobby
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="text-white main-margin width-vw">
        <h1>Rules</h1>
        <h4>
          each round the players are given a card with three items. Each Player
          is given one of the three items, highlighted in blue, to draw and is
          given 45 seconds to draw it. Since each of the three items are very
          similar you'll have to think outside the box to make sure the other
          players can differenciate your item from the others. Experiment with
          your imagination! After the time runs out players vote. Points are
          scored by correctly guessing others drawings and other players
          correctly guess what you drew. Points are also lost if you incorrectly
          guess other players' drawings. Voting on a player's sketch is not
          mandatory so in some cases it is more beneficial to not vote in order
          to retain potentially lost points. No drawing words or talking whilst
          voting. Most importantly have fun!
        </h4>
      </div>
    </>
  );
};

export default Main;
