import React, { useState, useContext } from "react";
import { LobbyContext } from "../context/LobbyContext";
import Select from "@mui/material/Select";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import MenuItem from "@mui/material/MenuItem";

const VoteBlock = ({ activePlayer, userSketch, card, SendVote }) => {
  const [voteChoice, setVoteChoice] = useState(card[0]);
  const [isDisabled, setIsDisabled] = useState(false);
  const { players } = useContext(LobbyContext);
  return (
    <>
      <Card variant="outlined" sx={{ maxWidth: 600 }}>
        <CardHeader title={userSketch.displayName} variant="h3"></CardHeader>
        <CardMedia
          component="img"
          height="600"
          image={userSketch.sketch}
          alt={`${userSketch.displayName}'s sketch`}
        />
        <CardContent>
          <Typography variant="h4" component="div"></Typography>
        </CardContent>
        {activePlayer.displayName !== userSketch.displayName && (
          <CardActions>
            <Select
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
            <Button
              variant="contained"
              disabled={isDisabled}
              onClick={() => {
                setIsDisabled(true);
                console.log(voteChoice);
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
            </Button>
            <Button size="small">Share</Button>
          </CardActions>
        )}
      </Card>
    </>
  );
};

export default VoteBlock;
