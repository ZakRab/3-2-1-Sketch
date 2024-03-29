import React, { useContext, useEffect, useState, useMemo } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import { GameContext } from "../context/GameContext";
import { LobbyContext } from "../context/LobbyContext";
import { Howl } from "howler";
import { ButtonBase } from "@mui/material";
import { useTransition, animated } from "react-spring";
import ColorRadios from "../components/ColorRadios";

const Sketch = ({ SendSketch }) => {
  const { displayName } = useContext(LobbyContext);
  const { RandTopic, card, setIsSketching, setIsVoting, setUserSketches } =
    useContext(GameContext);
  const [userTopic, setUserTopic] = useState([]);
  const [countDown, setCountDown] = useState(45);
  const [cardCountDown, setCardCountDown] = useState(3);
  const viewWidthw = window.screen.width;
  let canvas = React.createRef();
  const [color, setColor] = useState("black");
  const pencilSound = useMemo(
    () =>
      new Howl({
        src: [require("../components/audio/pencil-sound.mp3")],
        html5: true,
        volume: 1,
      }),
    []
  );
  const tickingSound = useMemo(
    () =>
      new Howl({
        src: [require("../components/audio/ticking-sound.mp3")],
        html5: true,
        volume: 1,
        rate: 1,
      }),
    []
  );

  useEffect(() => {
    setUserSketches([]);
    const topicPicker = setInterval(() => {
      setUserTopic(card[RandTopic()]);
    }, 150);
    setTimeout(() => {
      clearInterval(topicPicker);
      console.log("end rand");
    }, 3000);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setCardCountDown((curr) => curr - 1);
    }, 1000);
    if (cardCountDown <= 0) {
      setTimeout(() => {
        setCountDown((curr) => curr - 1);
      }, 1000);
    }
    if (cardCountDown <= 0 && countDown <= 0) {
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
    if (countDown === 10) {
      tickingSound.play();
    }
    if (countDown === 8) {
      tickingSound.pause();
    }
  }, [countDown, cardCountDown]);

  const barTransition = useTransition(cardCountDown <= 0, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    config: {
      duration: 3000,
    },
  });
  const colorPalletteTransition = useTransition(cardCountDown <= 0, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    config: {
      duration: 1500,
    },
  });
  const padTransition = useTransition(cardCountDown <= 0, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    config: {
      duration: 1000,
    },
  });
  function sketchPadSizing() {
    if (viewWidthw > 922) {
      return viewWidthw * 0.3;
    } else return viewWidthw * 0.92;
  }

  return (
    <>
      <div className="margin-auto sketch width-vw bg-blue d-flex margin-center space-evenly padding-large flex-wrap ">
        <div className="d-flex flex-column space-evenly text-center">
          <div className="bg-white sketch padding-small margin-auto margin-bottom">
            <span className="text-medium">
              {card.map((topic, idx) =>
                topic === userTopic ? (
                  <span style={{ color: "red" }} key={idx}>
                    {topic}
                  </span>
                ) : (
                  <span key={topic}>{topic}</span>
                )
              )}
            </span>
            {barTransition(
              (style, item) =>
                item && (
                  <animated.div style={style} className="progressbar ">
                    <div
                      style={{
                        height: "100%",
                        width: `${(countDown / 45) * 100}%`,
                        backgroundColor: "#401e9e",
                        transition: "width 1s",
                      }}
                    ></div>
                  </animated.div>
                )
            )}
          </div>

          {colorPalletteTransition(
            (style, item) =>
              item && (
                <animated.div style={style} className="margin-auto">
                  <ColorRadios color={color} setColor={setColor}></ColorRadios>
                </animated.div>
              )
          )}

          {padTransition(
            (style, item) =>
              item && (
                <animated.div style={style}>
                  <ButtonBase
                    onMouseDown={() => pencilSound.play()}
                    onTouchStart={() => pencilSound.play()}
                    onMouseUp={() => pencilSound.pause()}
                    onTouchEnd={() => pencilSound.pause()}
                    className="canvas"
                    disableRipple
                  >
                    <ReactSketchCanvas
                      ref={canvas}
                      width={sketchPadSizing()}
                      height={sketchPadSizing()}
                      strokeWidth={3}
                      backgroundImage={require("../components/images/paper-background.webp")}
                      exportWithBackgroundImage={true}
                      strokeColor={color}
                    />
                  </ButtonBase>
                </animated.div>
              )
          )}
        </div>
      </div>
    </>
  );
};

export default Sketch;
