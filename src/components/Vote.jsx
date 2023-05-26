import React, { useContext, useState, useInsertionEffect } from "react";
import { GameContext } from "../context/GameContext";
import { LobbyContext } from "../context/LobbyContext";
import Button from "@mui/material/Button";
import Carousel from "react-bootstrap/Carousel";

import VoteBlock from "./VoteBlock";
const Vote = ({ SendVote, ReadyPlayer, ToResults, readies, setReadies }) => {
  const { activePlayer, players } = useContext(LobbyContext);
  const { userSketches, card } = useContext(GameContext);
  const [clicked, setClicked] = useState(false);
  if (readies == players.length) {
    setReadies(0);
    ToResults();
  }
  return (
    <>
      <div className=" margin-auto sketch bg-blue margin-auto margin-center width-vw padding-large">
        <div className="text-white text-center margin-auto">
          {readies}/{players.length}
        </div>
        <div className="width-vw margin-auto">
          <Carousel variant="dark" interval={null}>
            {userSketches &&
              userSketches.map((userSketch, idx) => {
                return (
                  <Carousel.Item key={idx}>
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
          <Button
            disabled={clicked}
            variant="contained"
            onClick={() => {
              setClicked(true);
              ReadyPlayer();
            }}
          >
            Ready
          </Button>
        </div>
      </div>
    </>
  );
};

export default Vote;
