// const express = require("express");
// const app = express();

// app.use(express.static("dist"));

// // app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));
// app.listen(process.env.PORT || 8080, () =>
//   console.log(`Listening on port ${process.env.PORT || 8080}!`)
// );

var app = require("express")();
var cors = require("cors");
app.use(cors());

var http = require("http").createServer(app);

const PORT = 8080;

var io = require("socket.io")(http);

http.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});

io.on("connection", (socket) => {
  console.log("new client connected");
  socket.emit("connection", null);
});
