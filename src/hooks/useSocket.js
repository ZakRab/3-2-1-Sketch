import { io } from "socket.io-client";
import { useEffect, useState, useRef, useContext } from "react";
import { LobbyContext } from "../context/LobbyContext";
import { GameContext } from "../context/GameContext";
const useSocket = (lobbyKey) => {
  const { activePlayer, players, setPlayers } = useContext(LobbyContext);
  const {
    RandCard,
    setCard,
    setUserSketches,
    setIsSketching,
    setIsVoting,
    setResults,
    setUserVotes,
  } = useContext(GameContext);
  const [rounds, setRounds] = useState(0);
  const socketRef = useRef;
  useEffect(() => {
    socketRef.current = io("https://321Sketch.onrender.com/", {
      query: {
        displayName: activePlayer.displayName,
        isHost: activePlayer.isHost,
        lobbyKey,
      },
    });
    socketRef.current.on("user connect", ({ displayName, isHost }) => {
      if (activePlayer.isHost) {
        setPlayers((curr) => {
          let newPlayers = [...curr, { displayName, isHost, score: 0 }];
          socketRef.current.emit("update players", newPlayers);
          return newPlayers;
        });
      }
    });

    socketRef.current.on("start-game", (randCard) => {
      setIsSketching(true);
      setCard(randCard);
      setRounds((curr) => curr + 1);
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
    socketRef.current.on("receive-vote", (userVote) => {
      setUserVotes((curr) => [...curr, userVote]);
      if (userVote.isCorrect) {
        setPlayers((curr) =>
          curr.map((player) => {
            if (
              player.displayName === userVote.voter ||
              player.displayName === userVote.sketcher
            ) {
              player.score++;
            }
            return player;
          })
        );
      } else if (!userVote.isCorrect) {
        setPlayers((curr) =>
          curr.map((player) => {
            if (player.displayName === userVote.voter) {
              player.score--;
            }
            return player;
          })
        );
      }
    });
    socketRef.current.on("reset-round", () => {
      setResults(false);
    });
    socketRef.current.on("to-results", () => {
      setIsSketching(false);
      setIsVoting(false);
      setResults(true);
    });
  }, [lobbyKey]);

  function StartGame() {
    let card = RandCard();
    socketRef.current.emit("start-game", card);
  }
  function SendSketch(userSketch) {
    socketRef.current.emit("send-sketch", userSketch);
  }
  function SendVote(userVote) {
    socketRef.current.emit("send-vote", userVote);
  }

  function ResetRound() {
    StartGame();
    setUserVotes([]);
    socketRef.current.emit("reset-round");
  }
  function ToResults() {
    socketRef.current.emit("to-results");
  }
  return {
    players,
    StartGame,
    SendSketch,
    SendVote,
    ResetRound,
    ToResults,
    rounds,
  };
};
export default useSocket;
