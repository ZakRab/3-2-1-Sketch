import React, { useState, useSyncExternalStore } from "react";

export const GameContext = React.createContext(null);
export function GameProvider(props) {
  const cards = [
    ["baby ", "infant ", "newborn"],
    ["basic ", "simple ", "elementary"],
    ["bandit ", "outlaw ", "villain"],
    ["blessing ", "luck ", "fortune"],
    ["noodles ", "spaghetti ", "pasta"],
    ["bird ", "fowl ", "game"],
    ["pants ", "trousers ", "jeans"],
    ["orc ", "goblin ", "troll"],
    ["odd ", "strange ", "weird"],
    ["mist ", "fog ", "smog"],
    ["dog ", "dingo ", "wolf"],
    ["horse ", "donkey ", "zebra"],
    ["purse ", "handbag ", "clutch"],
    ["dumbledore ", "gandalf ", "merlin"],
    ["curtain ", "drape ", "valance "],
    ["shrub ", "bush ", "hedge "],
    ["caiman ", "crocidile ", "alligator "],
    ["turtle ", "tortise ", "sea turtle "],
    ["snake ", "worm ", "eel "],
    ["crawfish ", "crab ", "lobster"],
    ["grub ", "maggot ", "larvae "],
    ["bison ", "cow ", "bull "],
    ["cup ", "mug ", "teacup "],
    ["house ", "home ", "abode "],
    ["sprint ", "run ", "dash "],
    ["push ", "shove ", "nudge "],
    ["clog ", "shoe ", "loafer "],
    ["bifocals ", "glasses ", "spectacles "],
    ["couch ", "sofa ", "loveseat "],
    ["giftcard ", "credit card ", "driver's license "],
    ["book ", "journal ", "notebook "],
    ["oak ", "pine ", "maple "],
    ["fence  ", "barrier ", "wall "],
    ["pond ", "lake ", "ocean "],
    ["river ", "stream ", "creek "],
    ["forest ", "woodland ", "jungle "],
    ["coffee ", "tea ", "hot chocolate "],
    ["nose ", "snout ", "nostril "],
    ["moon ", "planet ", "star "],
    ["talons ", "claws ", "nails "],
    ["molars ", "canine ", "incisors "],
    ["frog ", "toad ", "amphibian "],
    ["orbit ", "circle ", "rotation "],
    ["bicycle ", "motorcycle ", "vespa "],
    ["igauna ", "gecko ", "salamander "],
    ["butter knife ", "steak knife ", "butcher knife "],
    ["snail ", "slug ", "caterpillar "],
    ["wood ", "timber ", "plank "],
    ["monkey ", "gorilla ", "chimpanzee "],
    ["wand ", "staff ", "scepter "],
    // ["smoothie ", "milkshake ", "card "],
    ["search ", "hunt ", "scavange "],
    ["bounty ", "treasure ", "booty "],
    ["bee ", "wasp ", "hornet "],
    ["meal  ", "dinner ", "supper "],
    ["leopard ", "lion ", "tiger "],
    ["cabinet ", "shelf ", "pantry "],
  ];
  const [card, setCard] = useState([]);
  const [isSketching, setIsSketching] = useState(false);
  const [isVoting, setIsVoting] = useState(false);
  const [isResults, setResults] = useState(false);
  const [userSketches, setUserSketches] = useState([]);
  const [userVotes, setUserVotes] = useState([]);
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
        isResults,
        setResults,
        setUserVotes,
        userVotes,
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
}
