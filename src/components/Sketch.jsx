import React, {useContext, useEffect, useRef, useState } from "react";
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
  const {RandTopic,card, setIsSketching, setIsVoting, setUserSketches, isSketching} = useContext(GameContext)
  const [userTopic, setUserTopic] = useState([])
  const [countDown, setCountDown] = useState(30)
  let canvas = React.createRef();
  let timeRef = useRef()
  useEffect(() => {
    setUserTopic(card[RandTopic()])
    setUserSketches([])
  }, [card])
useEffect(() => {
  if(countDown > 0){
      timeRef.current = setTimeout(() => {
      setCountDown((curr) => curr - 1)
      console.log(countDown);
     }, 1000)}
     else{
    canvas.current
    .exportImage("png")
    .then(data => {
      SendSketch({sketch: data, displayName, userTopic })

    })
    .catch(e => {
      console.log(e);
    });
    setIsSketching(false)
    setIsVoting(true)}
return () => {clearTimeout(timeRef.current)}
}, [countDown])

  return (
    <>
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
    
      
    </>
  );
};

export default Sketch;
