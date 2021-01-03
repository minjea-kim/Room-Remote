var app = require("express")();
var cors = require("cors");
const PORT = 3000;

app.all("/*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use(cors());
app.enable("trust proxy");

var http = require("http").createServer(app);

const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

http.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});

io.on("connection", (socket) => {
  console.log("new client connected");
  const { password } = socket.handshake.query;
  console.log(password);
  socket.join(password);
  socket.emit("connection", null);
});
