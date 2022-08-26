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
      {(isSketching || isResults || isVoting) && <h1>Round #{rounds}</h1>}
      {!isSketching && !isVoting && !isResults && (
        <>
          <h1>Lobby{lobbyKey}</h1>
          <h2>players</h2>
          {players &&
            players.map((player, idx) => {
              return <div key={idx}> {player.displayName}</div>;
            })}
          {activePlayer.isHost && (
            <Button variant="contained" onClick={() => ClickHandler()}>
              start game
            </Button>
          )}
        </>
      )}
      {isSketching && <Sketch SendSketch={SendSketch}></Sketch>}
      {isVoting && <Vote ToResults={ToResults} SendVote={SendVote}></Vote>}
      {isResults && <Results ResetRound={ResetRound} rounds={rounds}></Results>}
      <footer className="d-flex">
        <h3>{activePlayer.displayName}</h3>
        <Button variant="contained" className="d-inline">
          {
            players.filter((player) => {
              return player.displayName == activePlayer.displayName;
            }).score
          }
        </Button>
      </footer>
    </>
  );
};

export default Lobby;
