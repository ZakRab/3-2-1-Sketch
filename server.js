const PORT = process.env.PORT ?? 8080;
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const { instrument } = require("@socket.io/admin-ui");
const io = require("socket.io")(server, {
  cors: {
    origin: ["*", "https://admin.socket.io", "http://localhost:3000"],
    credentials: true,
  },
});
app.use(express.static(__dirname + "/build"));
app.get("*", (req, res) => {
  return res.sendFile("/build/index.html", { root: __dirname + "/" });
});

io.on("connection", (socket) => {
  let { displayName, isHost, lobbyKey } = socket.handshake.query;
  isHost = isHost === "true";
  socket.join(lobbyKey);
  io.to(lobbyKey).emit("user connect", { displayName, isHost });

  socket.on("update players", (players) => {
    io.to(lobbyKey).emit("update players", players);
  });

  socket.on("start-game", (card, rounds) => {
    io.to(lobbyKey).emit("start-game", card, rounds);
  });

  socket.on("send-sketch", (userSketch) => {
    io.to(lobbyKey).emit("receive-sketch", userSketch);
  });
  socket.on("send-vote", (userVote) => {
    io.to(lobbyKey).emit("receive-vote", userVote);
  });
  socket.on("reset-round", (rounds) => {
    io.to(lobbyKey).emit("reset-round", rounds);
  });
  socket.on("to-results", () => {
    io.to(lobbyKey).emit("to-results");
  });
  socket.on("ready-player", () => {
    io.to(lobbyKey).emit("ready-player");
  });

  socket.on("disconnect", () => {
    io.to(lobbyKey).emit("user disconnect", { displayName, isHost });
  });
});

instrument(io, { auth: false });

server.listen(PORT, () => console.log("The server is up and running!"));
