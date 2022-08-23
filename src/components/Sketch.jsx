import React, {useContext, useEffect, useState } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import {GameContext} from '../context/GameContext'
import {LobbyContext} from '../context/LobbyContext'
import { useParams, useNavigate } from "react-router-dom";
import useSocket from "../hooks/useSocket";
import { CountdownCircleTimer } from 'react-countdown-circle-timer'


const Sketch = () => {
  const navigate = useNavigate();
  const { lobbyKey } = useParams();
  const {displayName} = useContext(LobbyContext)
  const { SendSketch, } = useSocket(lobbyKey);
  const {RandTopic,card, isStarted} = useContext(GameContext)
  let userTopic = card[RandTopic()]
  const [sketch, setSketch] = useState("")
  const [userSketch, setUserSketch] = useState({ userTopic, sketch, player: displayName })
  const [countdown, setCountdown] = useState(30)
  let canvas = React.createRef();

 
  setTimeout(() => {
    canvas.current
    .exportImage("png")
    .then(data => {
      console.log(data);
      setSketch(data)
      SendSketch(userSketch)
      console.log(userSketch);
    })
    .catch(e => {
      console.log(e);
    });
    
    console.log(userSketch);
  }, 31 * 1000);

  return (
    <>
  { isStarted && <>
  <h2>The card: {card}</h2>
    <h2>Your topic: {userTopic}</h2>
    <CountdownCircleTimer
    isPlaying
    duration={30}
    colors={['#004777', '#F7B801', '#A30000', '#A30000']}
    colorsTime={[30, 15, 5, 0]}
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
      </>}
      
    </>
  );
};

export default Sketch;
