import React, { useState, useContext } from "react";
import { LobbyContext } from "../context/LobbyContext";

const VoteBlock = ({ activePlayer, userSketch, card, SendVote }) => {
  const [voteChoice, setVoteChoice] = useState(card[0]);
  const [isDisabled, setIsDisabled] = useState(false);
  const { players } = useContext(LobbyContext);
  return (
    <div>
      <figure>
        <figcaption>{userSketch.displayName}</figcaption>
        {activePlayer.displayName !== userSketch.displayName && (
          <>
            <select
              disabled={isDisabled}
              name="voteChoice"
              id="voteChoice"
              value={voteChoice}
              onChange={(e) => setVoteChoice(e.target.value)}
            >
              <option value={card[0]}>{card[0]}</option>
              <option value={card[1]}>{card[1]}</option>
              <option value={card[2]}>{card[2]}</option>
            </select>
            <button
              disabled={isDisabled}
              onClick={() => {
                setIsDisabled(true);
                console.log(voteChoice)
                let userVote = {
                  voter: activePlayer.displayName,
                  sketcher: userSketch.displayName,
                  isCorrect: voteChoice == userSketch.userTopic,
                  sketch: userSketch.sketch,
                  sketchTopic: userSketch.userTopic,
                  voted: voteChoice,
                };
                SendVote(userVote);
              }}
            >
              Submit Vote
            </button>
          </>
        )}
        <img
          src={userSketch.sketch}
          alt={`${userSketch.displayName}'s sketch`}
        />
      </figure>
    </div>
  );
};

export default VoteBlock;
