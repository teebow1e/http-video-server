const express = require("express");
const basicAuth = require("express-basic-auth");
const app = express();
const fs = require("fs");
const path = require("path");
require("dotenv").config();

app.set("view engine", "ejs");

app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);

  console.log("Headers:");
  for (const [key, value] of Object.entries(req.headers)) {
    console.log(`${key}: ${value}`);
  }

  next();
});

const users = {};
users[process.env.USERNAME] = process.env.PASSWORD;

app.use(
  basicAuth({
    users,
    challenge: true,
    unauthorizedResponse: "Unauthorized",
  })
);

app.get("/", function (req, res) {
  const videoFiles = fs
    .readdirSync(__dirname + "/video")
    .filter((file) => path.extname(file) === ".mp4");
  res.render("index", { videoFiles });
});

app.get("/video", function (req, res) {
  const range = req.headers.range;
  if (!range) {
    res.status(400).send("Requires Range header");
  }

  const videoPath = "video/" + req.query.videoPath || "video/example.mp4";
  const videoSize = fs.statSync(videoPath).size;
  let start, end;

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    start = parseInt(parts[0], 10);
    end = parts[1] ? parseInt(parts[1], 10) : videoSize - 1;
  } else {
    start = 0;
    end = Math.min(start + 102400, videoSize - 1);
  }

  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };

  res.writeHead(206, headers);
  const videoStream = fs.createReadStream(videoPath, { start, end });
  videoStream.pipe(res);
});

app.listen(8001, function () {
  console.log("Listening on port 8001!");
});
