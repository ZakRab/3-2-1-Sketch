// import { io } from "socket.io-client";
// import { useEffect, useState, useRef, useContext } from "react";
// import { LobbyContext } from "../context/LobbyContext";
// const useSocket = (lobbyKey) => {
//   const { host, displayName, activePlayer } = useContext(LobbyContext);
//   const [players, setPlayers] = useState([]);
//   const socketRef = useRef;
//   useEffect(() => {
//     socketRef.current = io("http://localhost:8080", {
//       query: {
//         displayName: activePlayer.displayName,
//         isHost: activePlayer.isHost,
//         lobbyKey,
//       },
//     });
//     socketRef.current.on("user connect", (activePlayer) => {
//       if (activePlayer.isHost) {
//         setPlayers((curr) => [activePlayer, ...curr]);
//         socketRef.current.emit("update players", { players });
//       }
//     });
//     socketRef.current.on("user disconnect", ({ activePlayer }) => {
//       setPlayers((curr) =>
//         curr.filter((val) => val.displayName !== activePlayer.displayName)
//       );
//     });
//   }, []);

//   // useEffect(() => {
//   //   socketRef.current = socketIoClient("http://localhost:8080", {
//   //     query: { displayName, lobbyKey },
//   //   });
//   //   socketRef.current.on("user connect", ({ displayName }) => {
//   //     let newMsg = {
//   //       displayName: "SERVER",
//   //       body: `${displayName} has joined the room`,
//   //       color: "#00ff00",
//   //     };
//   //   });
//   //   socketRef.current.on("user disconnect", ({ displayName }) => {
//   //     let newMsg = {
//   //       displayName: "SERVER",
//   //       body: `${displayName} has left the room`,
//   //       color: "#00ff00",
//   //     };
//   //   });
//   //   socketRef.current.on("message", (msg) => {
//   //     setMessages((curr) => [...curr, msg]);
//   //   });
//   //   return () => socketRef.current.disconnect();
//   // }, []);

//   // const sendMessage = useCallback(
//   //   (body) => {
//   //     socketRef.current.emit("message", { color, displayName, body });
//   //   },
//   //   [color, displayName]
//   // );
//   // return { messages, sendMessage };
//   return { players };
// };
// export default useSocket;
