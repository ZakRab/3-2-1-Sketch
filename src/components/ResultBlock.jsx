import React, { useState, useContext } from "react";
import { LobbyContext } from "../context/LobbyContext";
import { GameContext } from "../context/GameContext";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

const ResultBlock = ({ userSketch }) => {
  const { activePlayer, players } = useContext(LobbyContext);
  const { userSketches, userVotes } = useContext(GameContext);
  const viewWidthw = window.screen.width;
  const sketchPadSize = viewWidthw > 900 ? viewWidthw * 0.5 : viewWidthw * 0.92;

  return (
    <div className="tracking-in-expand">
      <Card variant="outlined" sx={{ sketchPadSize }}>
        <CardMedia
          component="img"
          image={userSketch.sketch}
          alt={`${userSketch.displayName}'s sketch`}
        />
      </Card>
    </div>
  );
};

export default ResultBlock;
