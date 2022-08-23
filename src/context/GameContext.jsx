import React, { useState } from "react";

export const GameContext = React.createContext(null);
export function GameProvider(props) {
  const cards = [
    ["baby ", "infant ", "newborn"],
    ["basic ", "simple ", "elementary"],
    ["bandit ", "outlaw ", "villain"],
    ["blessing ", "luck ", "fortune"],
    ["noddles ", "spaghetti ", "pasta"],
    ["bird ", "fowl ", "game"],
    ["pants ", "trousers ", "jeans"],
    ["orc ", "goblin ", "troll"],
    ["odd ", "strange ", "weird"],
    ["mist ", "fog ", "smog"],
    ["dumbledore ", "gandalf ", "merlin"],
  ];
  const [card, setCard] = useState([]);
  const [isStarted, setIsStarted] = useState(false);
  function RandCard() {
    let rand = Math.floor(Math.random() * cards.length);
    console.log(cards[rand]);
    return cards[rand];
  }

  function RandTopic() {
    let rand = Math.floor(Math.random() * 3);
    return rand;
  }
  return (
    <GameContext.Provider
      value={{
        RandTopic,
        RandCard,
        card,
        isStarted,
        setIsStarted,
        setCard,
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
}
