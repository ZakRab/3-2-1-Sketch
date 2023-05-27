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
    ReadyPlayer,
    readies,
    setReadies,
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
        <div className="main-margin d-flex width-p flex-column text-white bg-blue">
          <h1>Lobby {lobbyKey}</h1>
          <hr></hr>
          <div className="text-medium d-flex flex-column flex-wrap ">
            {players &&
              players.map((player, idx) => {
                return (
                  <div className="slide-in-right text-center" key={idx}>
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
      {isVoting && (
        <Vote
          ToResults={ToResults}
          ReadyPlayer={ReadyPlayer}
          SendVote={SendVote}
          setReadies={setReadies}
          readies={readies}
        ></Vote>
      )}
      {isResults && <Results ResetRound={ResetRound} rounds={rounds}></Results>}
      <div className="footer-filler"></div>
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
