var app = require("express")();
var cors = require("cors");
const bodyParser = require("body-parser");
const yts = require("yt-search");
const PORT = 3000;

app.all("/*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.enable("trust proxy");

var http = require("http").createServer(app);

const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
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

io.on("connection", (socket) => {
  const { password } = socket.handshake.query;
  console.log("NEW USER");
  console.log(password);
  socket.join(password);
  socket.emit("connection", null);
});
