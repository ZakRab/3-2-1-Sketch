import React, { useState, useContext } from "react";
import { LobbyContext } from "../context/LobbyContext";


const VoteBlock = ({ activePlayer, userSketch, card }) => {
  const [voteChoice, setVoteChoice] = useState(null);
  const { setPlayers, players  } = useContext(LobbyContext);
    const [isDisabled, setIsDisabled] = useState(false)
  return (
    <div>
      <figure>
        <figcaption>{userSketch.displayName}</figcaption>
        {activePlayer.displayName !== userSketch.displayName && (
          <>
            <select
              name="voteChoice"
              id="voteChoice"
              onChange={(e) => setVoteChoice(e.target.value)}
            >
            <option value="null"></option>
              <option value={card[0]}>{card[0]}</option>
              <option value={card[1]}>{card[1]}</option>
              <option value={card[2]}>{card[2]}</option>
            </select>
            <button disabled={isDisabled}
              onClick={() => {
                if(voteChoice == userSketch.userTopic){
                    console.log(true)
                    setIsDisabled(true)
                }else {console.log(false) && setIsDisabled(true) }
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
