import React, { useContext, useMemo } from "react";
import { GameContext } from "../context/GameContext";
import { LobbyContext } from "../context/LobbyContext";
import ResultBlock from "./ResultBlock";

const Results = ({ ResetRound, rounds }) => {
  const { activePlayer, players, setPlayers, setDisplayName } =
    useContext(LobbyContext);

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
  }
  return (
    <>
      <h1>{rounds >= 7 && "Final"} Results</h1>
      <>
        {rounds >= 7 && (
          <button oncCLick={() => startNewGame()}>New Game?</button>
        )}
        {activePlayer.isHost && rounds < 7 && (
          <button
            onClick={() => {
              ResetRound();
            }}
          >
            Start Next Round
          </button>
        )}

        <table>
          <thead>
            <tr>
              <th>player</th>
              <th>score</th>
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
                {" "}
                for {voteChoice.sketcher} you voted {voteChoice.voted} +1 point{" "}
              </p>
            ) : (
              <p>
                {" "}
                for {voteChoice.sketcher} you voted {voteChoice.voted} -1 point{" "}
              </p>
            );
          })}
        </div>

        {userSketches.map((userSketch) => {
          return <ResultBlock userSketch={userSketch} />;
        })}
      </>
    </>
  );
};

export default Results;
