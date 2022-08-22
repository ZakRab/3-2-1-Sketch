import { io } from "socket.io-client";
import { useEffect, useState, useRef, useContext } from "react";
import { LobbyContext } from "../context/LobbyContext";
const useSocket = (lobbyKey) => {
  const { host, displayName, activePlayer } = useContext(LobbyContext);
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
  }, [lobbyKey]);
  return { players };
};
export default useSocket;
