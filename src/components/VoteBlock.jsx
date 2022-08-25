import React, { useState, useContext } from "react";
import { LobbyContext } from "../context/LobbyContext";

const VoteBlock = ({ activePlayer, userSketch, card, SendVote }) => {
  const [voteChoice, setVoteChoice] = useState(null);
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
              onChange={(e) => setVoteChoice(e.target.value)}
            >
              <option value={card[0]}>{card[0]}</option>
              <option value={card[1]}>{card[1]}</option>
              <option value={card[2]}>{card[2]}</option>
            </select>
            <button
              disabled={isDisabled}
              onClick={() => {
                if (voteChoice == userSketch.userTopic) {
                  setIsDisabled(true);
                  console.log(players);
                  let userVote = {
                    voter: activePlayer.displayName,
                    sketcher: userSketch.displayName,
                    isCorrect: true,
                    sketch: userSketch.sketch,
                    sketchTopic: userSketch.userTopic,
                  };
                  SendVote(userVote);
                } else {
                  let userVote = {
                    voter: activePlayer.displayName,
                    sketcher: userSketch.displayName,
                    isCorrect: false,
                  };
                  SendVote(userVote);
                  setIsDisabled(true);
                }
              }}
            >
              submit Vote
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
