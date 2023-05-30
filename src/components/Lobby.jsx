import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import useSocket from "../hooks/useSocket";
import { LobbyContext } from "../context/LobbyContext";
import { GameContext } from "../context/GameContext";
import Sketch from "./Sketch";
import Vote from "./Vote";
import Results from "./Results";
import Button from "@mui/material/Button";
import { useTransition, animated, useChain, useSpringRef } from "react-spring";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import GameFooter from "./GameFooter";
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
  const { isSketching, isVoting, isResults } = useContext(GameContext);
  const sketchTransRef = useSpringRef();
  const voteTransRef = useSpringRef();
  const resultTransRef = useSpringRef();
  const sketchTransition = useTransition(isSketching, {
    from: { x: 500, opacity: 0 },
    enter: { x: 0, opacity: 1 },
    leave: { x: -500, opacity: 0 },
    ref: sketchTransRef,
  });

  const voteTransition = useTransition(isVoting, {
    from: { x: 500, opacity: 0 },
    enter: { x: 0, opacity: 1 },
    leave: { x: -500, opacity: 0 },
    ref: voteTransRef,
  });
  const resultTransition = useTransition(isResults, {
    from: { x: 500, opacity: 0 },
    enter: { x: 0, opacity: 1 },
    ref: resultTransRef,
  });
  useChain([sketchTransRef, voteTransRef, resultTransRef]);
  const [snackBar, setSnackBar] = useState(false);
  function ClickHandler() {
    if (players.length > 1) {
      StartGame();
    } else {
      setSnackBar((curr) => !curr);
    }
  }
  return (
    <>
      {!isSketching && !isVoting && !isResults && (
        <div className="main-margin d-flex width-lobby flex-column text-white bg-blue margin-top">
          <h1 className="text-medium">Lobby {lobbyKey}</h1>
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
            <Button
              startIcon={<PlayArrowIcon></PlayArrowIcon>}
              variant="contained"
              disabled={players.length < 2}
              onClick={() => ClickHandler()}
            >
              start game
            </Button>
          )}
          {!activePlayer.isHost && (
            <h2 className="text-medium">Waiting for host...</h2>
          )}
        </div>
      )}
      {sketchTransition(
        (style, item) =>
          item && (
            <animated.div style={style}>
              <Sketch SendSketch={SendSketch}></Sketch>
            </animated.div>
          )
      )}
      {voteTransition(
        (style, item) =>
          item && (
            <animated.div style={style}>
              <Vote
                ToResults={ToResults}
                ReadyPlayer={ReadyPlayer}
                SendVote={SendVote}
                setReadies={setReadies}
                readies={readies}
              ></Vote>
            </animated.div>
          )
      )}
      {resultTransition(
        (style, item) =>
          item && (
            <animated.div style={style}>
              <Results ResetRound={ResetRound} rounds={rounds}></Results>
            </animated.div>
          )
      )}
      <GameFooter rounds={rounds} players={players}></GameFooter>
    </>
  );
};

export default Lobby;
