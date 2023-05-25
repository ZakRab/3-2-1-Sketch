import React, { useContext, useMemo } from "react";
import { GameContext } from "../context/GameContext";
import { LobbyContext } from "../context/LobbyContext";
import { useNavigate } from "react-router-dom";
import ResultBlock from "./ResultBlock";
import Button from "@mui/material/Button";
import Carousel from "react-bootstrap/Carousel";

const Results = ({ ResetRound, rounds }) => {
  const { activePlayer, players, setPlayers, setDisplayName } =
    useContext(LobbyContext);
  const navigate = useNavigate();

  const {
    userSketches,
    userVotes,
    setIsSketching,
    setIsVoting,
    setUserSketches,
    setResults,
    setUserVotes,
    setCard,
  } = useContext(GameContext);

  const voteChoices = userVotes.filter((userVote) => {
    return activePlayer.displayName === userVote.voter;
  });
  function startNewGame() {
    setIsSketching(false);
    setIsVoting(false);
    setUserSketches(null);
    setResults(false);
    setUserVotes([]);
    setCard(null);
    setPlayers([]);
    setDisplayName(null);
    navigate("/main");
  }
  return (
    <div className="margin-auto sketch  bg-blue padding-large margin-center d-flex flex-row gap width-vw ">
      <div className="text-center">
        <div className="text-center margin-auto text-black bg-white sketch text-medium padding-small">
          {rounds >= 7 && (
            <Button variant="contained" onClick={() => startNewGame()}>
              New Game?
            </Button>
          )}

          <table className="margin-auto">
            <thead>
              <tr>
                <th>Player-</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player) => {
                return (
                  <tr>
                    <td>{player.displayName}</td>
                    <td>{player.score}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="score-overflow score-div ">
            {voteChoices.map((voteChoice) => {
              return voteChoice.isCorrect ? (
                <p>
                  for {voteChoice.sketcher} you voted {voteChoice.voted} +1
                  point{" "}
                </p>
              ) : (
                <p>
                  for {voteChoice.sketcher} you voted {voteChoice.voted} -1
                  point{" "}
                </p>
              );
            })}
          </div>
          {activePlayer.isHost && rounds < 7 && (
            <Button
              variant="contained"
              onClick={() => {
                ResetRound();
              }}
            >
              Start Next Round
            </Button>
          )}
        </div>
      </div>
      <div className="min-carsosuel">
        <Carousel variant="dark" interval={null}>
          {userSketches.map((userSketch) => {
            return (
              <Carousel.Item>
                <ResultBlock userSketch={userSketch} />
                <Carousel.Caption>
                  <h1>
                    -{userSketch.displayName + " drew " + userSketch.userTopic}-
                  </h1>
                </Carousel.Caption>
              </Carousel.Item>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
};

export default Results;
