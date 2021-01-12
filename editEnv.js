const fs = require("fs");

fs.readFile("./server-webhook.json", "utf8", (err, jsonString) => {
  if (err) {
    console.log("File read failed:", err);
    return;
  }

  let data = JSON.parse(jsonString);
  let webhook = `BACKEND_HOST=${data.tunnels[0].public_url}`;
  console.log(webhook);

  fs.writeFile(".env", webhook, function (err) {
    if (err) throw err;
    console.log("Saved!");
  });
});
