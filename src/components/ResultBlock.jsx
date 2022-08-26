import React, { useState, useContext } from "react";
import { LobbyContext } from "../context/LobbyContext";
import { GameContext } from "../context/GameContext";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";

const ResultBlock = ({ userSketch }) => {
  const { activePlayer, players } = useContext(LobbyContext);
  const { userSketches, userVotes } = useContext(GameContext);
  return (
    <>
      <Card variant="outlined" sx={{ maxWidth: 600 }}>
        <CardHeader
          title={userSketch.displayName + " drew " + userSketch.userTopic}
          variant="h3"
        ></CardHeader>
        <hr></hr>
        <CardMedia
          component="img"
          height="600"
          image={userSketch.sketch}
          alt={`${userSketch.displayName}'s sketch`}
        />
        <CardContent>
          <Typography variant="h4" component="div"></Typography>
        </CardContent>
        <hr></hr>
        <CardActions>
          <Button size="small">Share</Button>
        </CardActions>
      </Card>
    </>
  );
};

export default ResultBlock;
