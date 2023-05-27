import React, { useContext, useState, useEffect } from "react";
import { GameContext } from "../context/GameContext";
import { LobbyContext } from "../context/LobbyContext";
import Button from "@mui/material/Button";
import Carousel from "react-bootstrap/Carousel";
import VoteBlock from "./VoteBlock";
import { Skeleton } from "@mui/material";
const Vote = ({ SendVote, ReadyPlayer, ToResults, readies, setReadies }) => {
  const { activePlayer, players } = useContext(LobbyContext);
  const { userSketches, card } = useContext(GameContext);
  const [clicked, setClicked] = useState(false);
  const [visible, setVisible] = useState(true);
  const viewWidthw = window.screen.width;
  const sketchPadSize = viewWidthw > 900 ? viewWidthw * 0.5 : viewWidthw * 0.92;
  if (readies == players.length) {
    setReadies(0);
    ToResults();
  }
  return (
    <>
      <div
        className=" margin-auto sketch 
      bg-blue d-flex flex-column flex-wrap space-evenly
       margin-auto margin-center gap width-vw padding-large"
      >
        <h1 className="text-white text-center">Vote</h1>
        <div className="margin-auto">
          {visible && (
            <Skeleton
              variant="rounded"
              animation="wave"
              width={sketchPadSize}
              height={sketchPadSize}
            />
          )}
          <Carousel
            variant="dark"
            interval={null}
            onLoad={() => setVisible(false)}
          >
            {userSketches.map((userSketch, idx) => {
              return (
                <Carousel.Item key={idx}>
                  <VoteBlock
                    key={idx}
                    userSketch={userSketch}
                    activePlayer={activePlayer}
                    card={card}
                    SendVote={SendVote}
                  />
                </Carousel.Item>
              );
            })}
          </Carousel>
        </div>
        <div className="text-center margin-bottom join-button">
          <Button
            disabled={clicked}
            variant="contained"
            onClick={() => {
              setClicked(true);
              ReadyPlayer();
            }}
          >
            Ready {readies}/{players.length}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Vote;
