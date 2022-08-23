import React, {useContext, useEffect, useState } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import {GameContext} from '../context/GameContext'
import {LobbyContext} from '../context/LobbyContext'
import { useParams } from "react-router-dom";
import useSocket from "../hooks/useSocket";
import { CountdownCircleTimer } from 'react-countdown-circle-timer'


const Sketch = () => {
  const { lobbyKey } = useParams();
  const {displayName} = useContext(LobbyContext)
  const { SendSketch, } = useSocket(lobbyKey);
  const {RandTopic,card, isStarted} = useContext(GameContext)
  const [userTopic, setUserTopic] = useState([])
  let canvas = React.createRef();
  useEffect(() => {
    setUserTopic(card[RandTopic()])
  }, [card])
  
 
  setTimeout(() => {
    canvas.current
    .exportImage("png")
    .then(data => {
      console.log(data);
      SendSketch({sketch: data, displayName, userTopic })
      console.log({sketch: data, displayName, userTopic });
    })
    .catch(e => {
      console.log(e);
    });
  }, 11 * 1000);

  return (
    <>
  { isStarted && <>
  <h2>The card: {card}</h2>
    <h2>Your topic: {userTopic}</h2>
    <CountdownCircleTimer
    isPlaying
    duration={10}
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
