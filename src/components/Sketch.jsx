import React, { useContext, useEffect, useState } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import { GameContext } from "../context/GameContext";
import { LobbyContext } from "../context/LobbyContext";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Topic } from "@mui/icons-material";
import { useRadioGroup } from "@mui/material/RadioGroup";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  FormControl,
} from "@mui/material";

const Sketch = ({ SendSketch }) => {
  const { displayName, players } = useContext(LobbyContext);
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
  const [color, setColor] = useState("black");
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
              duration={30}
              colors={["#05c22e", "#ffea00", "#ff8800", "#dc0303"]}
              colorsTime={[30, 15, 5, 0]}
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
          <div className="margin-auto">
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="black"
                row
                name="radio-buttons-group"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              >
                <FormControlLabel
                  value="black"
                  control={
                    <Radio
                      sx={{
                        color: "black",
                        "&.Mui-checked": {
                          color: "black",
                        },
                        "& .MuiSvgIcon-root": {
                          fontSize: 50,
                        },
                      }}
                    />
                  }
                />
                <FormControlLabel
                  value="red"
                  control={
                    <Radio
                      sx={{
                        color: "red",
                        "&.Mui-checked": {
                          color: "red",
                        },
                        "& .MuiSvgIcon-root": {
                          fontSize: 50,
                        },
                      }}
                    />
                  }
                />
                <FormControlLabel
                  value="orange"
                  control={
                    <Radio
                      sx={{
                        color: "orange",
                        "&.Mui-checked": {
                          color: "orange",
                        },
                        "& .MuiSvgIcon-root": {
                          fontSize: 50,
                        },
                      }}
                    />
                  }
                />
                <FormControlLabel
                  value="blue"
                  control={
                    <Radio
                      sx={{
                        color: "blue",
                        "&.Mui-checked": {
                          color: "blue",
                        },
                        "& .MuiSvgIcon-root": {
                          fontSize: 50,
                        },
                      }}
                    />
                  }
                />
                <FormControlLabel
                  value="green"
                  control={
                    <Radio
                      sx={{
                        color: "green",
                        "&.Mui-checked": {
                          color: "green",
                        },
                        "& .MuiSvgIcon-root": {
                          fontSize: 50,
                        },
                      }}
                    />
                  }
                />
              </RadioGroup>
            </FormControl>
          </div>
        </div>
        <div className="canvas">
          <ReactSketchCanvas
            ref={canvas}
            width={sketchPadSizing()}
            height={sketchPadSizing()}
            strokeWidth={2}
            strokeColor={color}
          />
        </div>
      </div>
    </>
  );
};

export default Sketch;
