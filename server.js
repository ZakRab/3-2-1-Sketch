const PORT = process.env.PORT ?? 8080;
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
app.use(express.static(__dirname + "/build"));
app.get("*", (req, res) => {
  return res.sendFile("/build/index.html", { root: __dirname + "/" });
});

io.on("connection", (socket) => {
  const { displayName, lobbyKey } = socket.handshake.query;
  socket.join(lobbyKey);
  io.to(lobbyKey).emit("user connect", { displayName });

  socket.on("disconnect", () => {
    io.to(lobbyKey).emit("user disconnect", { displayName });
  });
});
server.listen(PORT, () => console.log("listening"));
