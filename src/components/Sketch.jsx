import React, {useContext, useState } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import {GameContext} from '../context/GameContext'
import {LobbyContext} from '../context/LobbyContext'
import { useParams, useNavigate } from "react-router-dom";

const Sketch = () => {
  const navigate = useNavigate();
  const { lobbyKey } = useParams();
const {displayName} = useContext(LobbyContext)
  const {
    RandTopic,
    RandCard,
    card,
  } = useContext(GameContext)
let userTopic = card[RandTopic()] 
const [sketch, setSketch] = useState("")
const [userSketch, setUserSketch] = useState({userTopic, sketch, player: displayName })
  let canvas = React.createRef();

  setTimeout(() => {
    canvas.current
    .exportImage("png")
    .then(data => {
      setSketch(data);
    })
    .catch(e => {
      console.log(e);
    });
    
    navigate(`/vote/:${lobbyKey}`)
  }, 30 * 1000);

  return (
    <>
    <h2>The card: {card}</h2>
    <h2>Your topic: {userTopic}</h2>
      <div>
        <ReactSketchCanvas
        ref={canvas}
          width="600px"
          height="600px"
          strokeWidth={2}
          strokeColor="black"
        />
      </div>
      {/* <button
          onClick={() => {
            canvas.current
              .exportImage("png")
              .then(data => {
                console.log(data);
              })
              .catch(e => {
                console.log(e);
              });
          }}
        >
          Get Image
        </button> */}
      
    </>
  );
};

export default Sketch;
