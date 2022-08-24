import React, { useState, useSyncExternalStore } from "react";

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
  const [isSketching, setIsSketching] = useState(false);
  const [isVoting, setIsVoting] = useState(false);
  const [userSketches, setUserSketches] = useState([]);
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
        isSketching,
        setIsSketching,
        setCard,
        isVoting,
        setIsVoting,
        setUserSketches,
        userSketches,
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
}
