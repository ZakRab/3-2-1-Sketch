import { useContext } from "react";
import { useParams } from "react-router-dom";
import useSocket from "../hooks/useSocket";
import { LobbyContext } from "../context/LobbyContext";
import { GameContext } from "../context/GameContext";
import Sketch from "./Sketch";
import Vote from "./Vote";
import Results from "./Results";
import Button from "@mui/material/Button";

const Lobby = () => {
  const { activePlayer } = useContext(LobbyContext);
  const { lobbyKey } = useParams();
  const {
    players,
    StartGame,
    SendSketch,
    SendVote,
    ResetRound,
    ToResults,
    rounds,
  } = useSocket(lobbyKey);
  const { RandCard, isSketching, isVoting, isResults } =
    useContext(GameContext);

  function ClickHandler() {
    RandCard();
    StartGame();
  }
  return (
    <>
      {!isSketching && !isVoting && !isResults && (
        <div className="main-margin margin-center text-white bg-blue">
          <h1>Lobby {lobbyKey}</h1>
          <hr></hr>
          <div className="height150px d-flex flex-row flex-wrap main-flex">
            {players &&
              players.map((player, idx) => {
                return (
                  <div className="bigger-font slide-in-right" key={idx}>
                    {" "}
                    {player.displayName.toUpperCase()}
                  </div>
                );
              })}
          </div>
          {activePlayer.isHost && (
            <Button variant="contained" onClick={() => ClickHandler()}>
              start game
            </Button>
          )}
        </div>
      )}
      {isSketching && <Sketch SendSketch={SendSketch}></Sketch>}
      {isVoting && <Vote ToResults={ToResults} SendVote={SendVote}></Vote>}
      {isResults && <Results ResetRound={ResetRound} rounds={rounds}></Results>}
      <footer className="d-flex top-border space-between">
        <h2 className="margin-top-small">-{activePlayer.displayName}-</h2>
        {(isSketching || isResults || isVoting) && (
          <h2 className="margin-top-small">Round #{rounds}/7</h2>
        )}
        {rounds >= 2 && (
          <h2 className="d-block text-black padding-small">
            -
            {
              players.filter((player) => {
                return player.displayName == activePlayer.displayName;
              })[0].score
            }
            -
          </h2>
        )}
      </footer>
    </>
  );
};

export default Lobby;
