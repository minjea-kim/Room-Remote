var app = require("express")();
var cors = require("cors");
const bodyParser = require("body-parser");
const yts = require("yt-search");
const PORT = 3000;

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


// Variables for app
const username = "test";
const password = "123";
let queueItems = [];

// REST API
app.get("/queueitems", (req, res) => {
  res.send(queueItems);
});

app.post("/login", async function (req, res) {
  console.log(req.body.username);
  if (req.body.username == username && req.body.password == password) {
    res.send(true);
  } else {
    res.send(false);
  }
});

app.post("/youtube", async function (req, res) {
  const searchTerm = req.body.searchTerm;
  try {
    let results = [];
    let maxAttempts = 0;

    while (results.length === 0 && maxAttempts < 6) {
      console.log("Attempt number: ", maxAttempts);
      const searchResults = await yts(searchTerm);
      results = searchResults.videos;
      maxAttempts += 1;
    }
    res.send(results);
  } catch (err) {
    console.log(err);
    res.send(results);
  }
});

http.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});

// SOCKET CONNECTION
io.on("connection", (socket) => {
  const { roomID } = socket.handshake.query;
  console.log(roomID);
  socket.join(roomID);
  socket.emit("connection", null);

  // Listen for new messages
  socket.on("addNewItem", (data) => {
    // console.log("NEW ITEM: ", data.body);
    queueItems.push(data.item);
    io.sockets.in(data.roomID).emit("addNewItem", data.item);
  });

  socket.on("removeItem", (data) => {
    queueItems = queueItems.filter((item, i) => i !== data.itemIndex);
    io.sockets.in(data.roomID).emit("removeItem", data.itemIndex);
  });

  socket.on("placeItemFirst", (data) => {
    const item = queueItems[data.itemIndex];
    let tempQueueItems = queueItems.filter((item, i) => i !== data.itemIndex);
    tempQueueItems.unshift(item);
    console.log(tempQueueItems);
    queueItems = tempQueueItems;
    io.sockets.in(data.roomID).emit("placeItemFirst", queueItems);
  });

  socket.on("playVideo", (data) => {
    io.sockets.in(data.roomID).emit("playVideo");
  });

  socket.on("pauseVideo", (data) => {
    io.sockets.in(data.roomID).emit("pauseVideo");
  });
});
