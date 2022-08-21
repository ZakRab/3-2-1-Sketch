// const PORT = process.env.PORT ?? 8080;
// const express = require("express");
// const app = express();
// const server = require("http").createServer(app);
// const { instrument } = require("@socket.io/admin-ui");
// const io = require("socket.io")(server, {
//   cors: {
//     origin: [
//       // "http://localhost:3000",
//       "*",
//       "https://admin.socket.io",
//       "http://localhost:8080",
//     ],
//   },
// });
// // app.use(express.static(__dirname + "/build"));
// // app.get("*", (req, res) => {
// //   return res.sendFile("/build/index.html", { root: __dirname + "/" });
// // });

// io.on("connection", (socket) => {
//   let { displayName, isHost, lobbyKey } = socket.handshake.query;
//   isHost = isHost === "true";
//   socket.join(lobbyKey);
//   io.to(lobbyKey).emit("user connect", { displayName, isHost });
//   console.log(displayName, isHost);
//   // socket.on("update players", (players) => console.log(players));

//   socket.on("disconnect", () => {
//     io.to(lobbyKey).emit("user disconnect", { displayName, isHost });
//   });
// });

// instrument(io, { auth: false });

// server.listen(PORT, () => console.log("listening"));
