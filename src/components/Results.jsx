import React, { useContext, useEffect, useState } from "react";
import { GameContext } from "../context/GameContext";
import { LobbyContext } from "../context/LobbyContext";
import { useNavigate } from "react-router-dom";
import ResultBlock from "./ResultBlock";
import Button from "@mui/material/Button";
import Carousel from "react-bootstrap/Carousel";
import ConfettiExplosion from "react-confetti-explosion";

const Results = ({ ResetRound, rounds }) => {
  const { activePlayer, players, setPlayers, setDisplayName, setLobbyKey } =
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
    setLobbyKey(null);
    setIsExploding(false);
  }
  const [isExploding, setIsExploding] = useState(false);

  useEffect(() => {
    if (rounds === 7) {
      setIsExploding(true);
    }
  }, [rounds]);

  function Winner() {
    let playersArr = players;
    playersArr.sort((a, b) => {
      return a.score - b.score;
    });
    return playersArr[0].displayName;
  }

  return (
    <div
      className="margin-auto sketch bg-blue padding-large 
    margin-center d-flex flex-row gap width-vw space-evenly"
    >
      <div className="text-center">
        <h1 className="text-white text-medium">
          {rounds >= 7 && "Final "} Results
          {isExploding && (
            <ConfettiExplosion
              force={0.7}
              duration={4000}
              particleCount={250}
              width={2000}
            />
          )}
        </h1>
        <div className="d-flex flex-media gap ">
          <div className="text-center text-black bg-white sketch text-medium padding-small">
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
                {players.map((player, idx) => {
                  return (
                    <tr key={idx}>
                      <td>{player.displayName}</td>
                      <td>{player.score}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="score-overflow score-div">
              {voteChoices.map((voteChoice, idx) => {
                return voteChoice.isCorrect ? (
                  <p key={idx}>
                    for {voteChoice.sketcher} you voted {voteChoice.voted} +1
                    point{" "}
                  </p>
                ) : (
                  <p key={idx}>
                    for {voteChoice.sketcher} you voted {voteChoice.voted} -1
                    point{" "}
                  </p>
                );
              })}
            </div>
            {activePlayer.isHost && rounds < 7 && (
              <div className="margin-top-small">
                <Button
                  variant="contained"
                  onClick={() => {
                    ResetRound();
                  }}
                >
                  Start Next Round
                </Button>
              </div>
            )}
          </div>
          <div className="">
            <Carousel variant="dark" interval={null}>
              {userSketches.map((userSketch, idx) => {
                return (
                  <Carousel.Item key={idx}>
                    <ResultBlock key={idx} userSketch={userSketch} />
                    <Carousel.Caption>
                      <h1
                        style={{
                          background: "#401e9e",
                          color: "white",
                          borderRadius: "5px",
                        }}
                      >
                        -
                        {userSketch.displayName +
                          " drew " +
                          userSketch.userTopic}
                        -
                      </h1>
                    </Carousel.Caption>
                  </Carousel.Item>
                );
              })}
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
