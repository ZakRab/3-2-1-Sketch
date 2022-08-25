import React, { useContext, useEffect, useState } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import { GameContext } from "../context/GameContext";
import { LobbyContext } from "../context/LobbyContext";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const Sketch = ({ SendSketch }) => {
  const { displayName } = useContext(LobbyContext);
  const {
    RandTopic,
    card,
    setIsSketching,
    setIsVoting,
    setUserSketches,
    isSketching,
  } = useContext(GameContext);
  const [userTopic, setUserTopic] = useState([]);
  const [countDown, setCountDown] = useState(45);
  let canvas = React.createRef();
  useEffect(() => {
    setUserTopic(card[RandTopic()]);
    setUserSketches([]);
  }, [card]);
  useEffect(() => {
    if (countDown > 0) {
      setTimeout(() => {
        setCountDown((curr) => curr - 1);
      }, 1000);
    } else {
      canvas.current
        .exportImage("png")
        .then((data) => {
          SendSketch({ sketch: data, displayName, userTopic });
        })
        .catch((e) => {
          console.log(e);
        });
      setIsSketching(false);
      setIsVoting(true);
    }
  }, [countDown]);

  return (
    <>
      <h2>The card: {card}</h2>
      <h2>Your topic: {userTopic}</h2>
      <CountdownCircleTimer
        isPlaying
        duration={45}
        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[45, 30, 15, 0]}
      >
        {({ remainingTime }) => remainingTime}
      </CountdownCircleTimer>
      <div>
        <ReactSketchCanvas
          ref={canvas}
          width="600px"
          height="600px"
          strokeWidth={2}
          strokeColor="black"
        />
      </div>
    </>
  );
};

export default Sketch;
