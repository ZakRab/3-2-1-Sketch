import React, { useContext, useEffect, useState } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import { GameContext } from "../context/GameContext";
import { LobbyContext } from "../context/LobbyContext";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Topic } from "@mui/icons-material";

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
  const viewWidthw = window.screen.width;
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

  function sketchPadSizing() {
    if (viewWidthw > 922) {
      return viewWidthw * 0.3;
    } else return viewWidthw * 0.92;
  }

  return (
    <>
      <div className="margin-auto sketch width-vw bg-blue d-flex margin-center space-evenly padding-large flex-wrap ">
        <div className="d-flex flex-column space-evenly text-center">
          {/* <div className="bg-white sketch padding-small text-medium margin-auto">
            <CountdownCircleTimer
              isPlaying
              duration={45}
              colors={["#05c22e", "#ffea00", "#ff8800", "#dc0303"]}
              colorsTime={[35, 20, 8, 0]}
            >
              {({ remainingTime }) => remainingTime}
            </CountdownCircleTimer>
          </div> */}
          <div className="bg-white sketch padding-small margin-auto margin-bottom">
            <span className="text-medium">
              {card.map((topic, idx) =>
                topic == userTopic ? (
                  <span style={{ color: "blue" }} key={idx}>
                    {topic}
                  </span>
                ) : (
                  <span key={topic}>{topic}</span>
                )
              )}
            </span>
            <div className="progressbar ">
              <div
                style={{
                  height: "100%",
                  width: `${(countDown / 45) * 100}%`,
                  backgroundColor: "#401e9e",
                  transition: "width 1s",
                }}
              ></div>
            </div>
          </div>
        </div>
        <div className="">
          <ReactSketchCanvas
            ref={canvas}
            width={sketchPadSizing()}
            height={sketchPadSizing()}
            strokeWidth={2}
            strokeColor="black"
          />
        </div>
      </div>
    </>
  );
};

export default Sketch;
