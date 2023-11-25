# http-video-server

This is a Node.js application for streaming video content over HTTP using the Express.js framework. It allows you to efficiently serve large video files to clients while supporting partial content requests.

## Prerequisites

You need to have Node.js installed in your local machine.

## Installation

1. Clone this repository or download the source code.
2. From here, navigate to the project directory, and do `npm install`
3. After that, copy `.env.example` into a new file called `.env`. This file contains the credential to log in the website, make sure to have a look at it!

## Usage
Place your video file in the `video` directory of the project. Then, start the server by running the following command:

```bash
node server.js
```

This will start the server, and you will see the message "Listening on port 8001!" in the console, indicating that the server is running.

To access the video player, open a web browser and navigate to <http://localhost:8001/>. You should be able to watch the video.

## Credit

Big thanks to @thesmartcoder7 for creating [video_streaming_server](https://github.com/thesmartcoder7/video_streaming_server) - the inspiration of this project.