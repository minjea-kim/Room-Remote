var app = require("express")();
var cors = require("cors");
const bodyParser = require("body-parser");
const PORT = 3001;


// SERVER SETUP
app.all("/*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use(cors());
app.use(bodyParser.json());
app.enable("trust proxy");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

var http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

http.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});

// SOCKET
var robot = require("robotjs");
robot.setMouseDelay(1);  // Mouse Speed
var mousePosition = robot.getMousePos();

// SOCKET CONNECTION
io.on("connection", (socket) => {
  const { roomID } = socket.handshake.query;
  console.log(roomID);
  socket.join(roomID);
  socket.emit("connection", null);

  // Listen for new messages
  socket.on("up", (data) => {
    var mousePosition = robot.getMousePos();
    console.log(mousePosition);
  });
});


// Need front end to call an event only on first click, not hold
// This event will ask for mouse's location and set that as a constant

// robot.moveMouseSmooth(x, y);

