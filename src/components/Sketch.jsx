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
  const [countDown, setCountDown] = useState(30);
  const [viewWidth, setViewWidth] = useState(window.outerWidth.toString());
  const [viewHeight, setViewHeight] = useState(window.outerHeight.toString());
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
    }
    // else {
    //   canvas.current
    //     .exportImage("png")
    //     .then((data) => {
    //       SendSketch({ sketch: data, displayName, userTopic });
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     });
    //   setIsSketching(false);
    //   setIsVoting(true);
    // }
  }, [countDown]);

  return (
    <>
      <div className="margin-auto sketch width-vw bg-blue d-flex gap margin-center space-evenly padding-large flex-wrap ">
        <div className="d-flex flex-column space-evenly text-center">
          <div className="bg-white sketch padding-small margin-auto">
            <h1>Draw: {userTopic}</h1>
          </div>
          <div className="progressbar width-vw">
            <div
              style={{
                height: "100%",
                width: `${(countDown / 30) * 100}%`,
                backgroundColor: "#401e9e",
                transition: "width 1s",
              }}
            ></div>
          </div>
          {/* <div className="bg-white sketch padding-small text-medium margin-auto">
            <CountdownCircleTimer
              isPlaying
              duration={30}
              colors={["#05c22e", "#ffea00", "#ff8800", "#dc0303"]}
              colorsTime={[30, 15, 5, 0]}
            >
              {({ remainingTime }) => remainingTime}
            </CountdownCircleTimer>
          </div> */}
          <div className="bg-white sketch  padding-small margin-auto">
            <h1>Card: {card}</h1>
          </div>
        </div>
        <div className="">
          <ReactSketchCanvas
            ref={canvas}
            width={viewWidth}
            height="400px"
            strokeWidth={2}
            strokeColor="black"
          />
        </div>
      </div>
    </>
  );
};

export default Sketch;
