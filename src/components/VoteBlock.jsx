import React, { useState, useContext } from "react";
import { LobbyContext } from "../context/LobbyContext";
import Select from "@mui/material/Select";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

const VoteBlock = ({ activePlayer, userSketch, card, SendVote }) => {
  const [voteChoice, setVoteChoice] = useState(card[0]);
  const [isDisabled, setIsDisabled] = useState(false);
  const { players } = useContext(LobbyContext);
  return (
    <div className="tracking-in-expand">
      <Card variant="outlined" sx={{ maxWidth: 600 }}>
        {activePlayer.displayName !== userSketch.displayName && (
          <div className="text-center">
            <CardActions>
              <div className="width-p"></div>
              <div className="margin-right">
                <Select
                  sx={{ height: 40 }}
                  variant="standard"
                  disabled={isDisabled}
                  name="voteChoice"
                  id="voteChoice"
                  value={voteChoice}
                  onChange={(e) => setVoteChoice(e.target.value)}
                >
                  <MenuItem value={card[0]}>{card[0]}</MenuItem>
                  <MenuItem value={card[1]}>{card[1]}</MenuItem>
                  <MenuItem value={card[2]}>{card[2]}</MenuItem>
                </Select>
              </div>
              <Button
                variant="contained"
                disabled={isDisabled}
                onClick={() => {
                  setIsDisabled(true);
                  let userVote = {
                    voter: activePlayer.displayName,
                    sketcher: userSketch.displayName,
                    isCorrect: voteChoice === userSketch.userTopic,
                    sketch: userSketch.sketch,
                    sketchTopic: userSketch.userTopic,
                    voted: voteChoice,
                  };
                  SendVote(userVote);
                }}
              >
                Submit Vote
              </Button>
            </CardActions>
          </div>
        )}
        <CardMedia
          component="img"
          height="600"
          image={userSketch.sketch}
          alt={`${userSketch.displayName}'s sketch`}
        />
      </Card>
    </div>
  );
};

export default VoteBlock;
