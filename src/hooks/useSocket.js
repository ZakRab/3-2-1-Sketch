import { io } from "socket.io-client";
import { useEffect, useState, useRef, useContext } from "react";
import { LobbyContext } from "../context/LobbyContext";
import { GameContext } from "../context/GameContext";
const useSocket = (lobbyKey) => {
  const { host, displayName, activePlayer } = useContext(LobbyContext);
  const {
    setIsStarted,
    RandCard,
    setCard,
    setUserSketches,
    setIsSketching,
    setIsVoting,
  } = useContext(GameContext);
  const [players, setPlayers] = useState([]);

  const socketRef = useRef;
  useEffect(() => {
    socketRef.current = io("http://localhost:8080", {
      query: {
        displayName: activePlayer.displayName,
        isHost: activePlayer.isHost,
        lobbyKey,
      },
    });
    socketRef.current.on("user connect", ({ displayName, isHost }) => {
      if (activePlayer.isHost) {
        setPlayers((curr) => {
          let newPlayers = [{ displayName, isHost }, ...curr];
          socketRef.current.emit("update players", newPlayers);
          return newPlayers;
        });
      }
    });

    socketRef.current.on("start-game", (randCard) => {
      console.log(randCard);
      setIsSketching(true);
      setCard(randCard);
    });
    socketRef.current.on("user disconnect", ({ displayName, isHost }) => {
      if (activePlayer.isHost) {
        setPlayers((curr) => {
          let newPlayers = curr.filter(
            (val) => val.displayName !== displayName
          );
          socketRef.current.emit("update players", newPlayers);
          return newPlayers;
        });
      }
    });
    socketRef.current.on("update players", (newPlayers) => {
      if (!activePlayer.isHost) {
        setPlayers(newPlayers);
      }
    });

    socketRef.current.on("receive-sketch", (userSketch) => {
      setUserSketches((curr) => [...curr, userSketch]);
    });
    socketRef.current.on("reset-round", () => {
      setIsSketching(true);
      setIsVoting(false);
    });
  }, [lobbyKey]);

  function StartGame() {
    let card = RandCard();
    console.log(card);
    socketRef.current.emit("start-game", card);
  }
  function SendSketch(userSketch) {
    socketRef.current.emit("send-sketch", userSketch);
  }
  function ResetRound() {
    StartGame();
    socketRef.current.emit("reset-round");
  }
  return { players, StartGame, SendSketch, ResetRound };
};
export default useSocket;
