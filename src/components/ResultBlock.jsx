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
  const viewWidthw = window.screen.width;
  function sketchPadSizing() {
    if (viewWidthw > 900) {
      return viewWidthw * 0.5;
    } else return viewWidthw * 0.92;
  }
  return (
    <>
      <Card variant="outlined" sx={sketchPadSizing()}>
        <CardMedia
          component="img"
          image={userSketch.sketch}
          alt={`${userSketch.displayName}'s sketch`}
        />
      </Card>
    </>
  );
};

export default ResultBlock;
