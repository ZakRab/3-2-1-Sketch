import React, { useContext, useInsertionEffect } from "react";
import { GameContext } from "../context/GameContext";
import { LobbyContext } from "../context/LobbyContext";
import Button from "@mui/material/Button";
import Carousel from "react-bootstrap/Carousel";

import VoteBlock from "./VoteBlock";
const Vote = ({ ToResults, SendVote }) => {
  const { activePlayer, rounds, setPlayers, players } =
    useContext(LobbyContext);
  const { userSketches, card } = useContext(GameContext);

  return (
    <>
      <div className=" margin-auto sketch bg-blue margin-auto margin-center width-vw padding-large">
        <div className="text-white text-center margin-auto"></div>
        <div className="width-vw margin-auto">
          <Carousel variant="dark" interval={null}>
            {userSketches &&
              userSketches.map((userSketch, idx) => {
                return (
                  <Carousel.Item className="d-flex">
                    <VoteBlock
                      key={idx}
                      userSketch={userSketch}
                      activePlayer={activePlayer}
                      card={card}
                      SendVote={SendVote}
                    />
                    <Carousel.Caption>
                      <h1>-{userSketch.displayName}-</h1>
                    </Carousel.Caption>
                  </Carousel.Item>
                );
              })}
          </Carousel>
        </div>
        <div className="text-center join-button">
          {activePlayer.isHost && (
            <Button variant="contained" onClick={() => ToResults()}>
              Round Results
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default Vote;
