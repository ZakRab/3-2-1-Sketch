import { io } from "socket.io-client";
import { useEffect, useState, useRef } from "react";
const useSocket = (lobbyKey, displayName) => {
  const [players, setPlayers] = useState([]);
  const socketRef = useRef;
  useEffect(() => {
    socketRef.current = io("http://localhost:8080", {
      query: { displayName, lobbyKey },
    });
    socketRef.current.on("user connect", ({ displayName }) => {
      setPlayers((curr) => [displayName, ...curr]);
      console.log(players);
    });
    socketRef.current.on("user disconnect", ({ displayName }) => {
      setPlayers((curr) => curr.filter((val) => val !== displayName) );
    });
  }, []);

  // useEffect(() => {
  //   socketRef.current = socketIoClient("http://localhost:8080", {
  //     query: { displayName, lobbyKey },
  //   });
  //   socketRef.current.on("user connect", ({ displayName }) => {
  //     let newMsg = {
  //       displayName: "SERVER",
  //       body: `${displayName} has joined the room`,
  //       color: "#00ff00",
  //     };
  //   });
  //   socketRef.current.on("user disconnect", ({ displayName }) => {
  //     let newMsg = {
  //       displayName: "SERVER",
  //       body: `${displayName} has left the room`,
  //       color: "#00ff00",
  //     };
  //   });
  //   socketRef.current.on("message", (msg) => {
  //     setMessages((curr) => [...curr, msg]);
  //   });
  //   return () => socketRef.current.disconnect();
  // }, []);

  // const sendMessage = useCallback(
  //   (body) => {
  //     socketRef.current.emit("message", { color, displayName, body });
  //   },
  //   [color, displayName]
  // );
  // return { messages, sendMessage };
  return { players };
};
export default useSocket;
