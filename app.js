var express = require("express"),
  http = require("http"),
  path = require("path"),
  redisClient = require("redis").createClient(),
  app = express(),
  twitterWorker = require("./twitterworker.js");

twitterWorker();

// This is our basic configuration                                                                                                                     
app.configure(function () {
  app.use(express.static(path.join(__dirname, 'public')));
});

// Create the http server and get it to                                                                                                                
// listen on the specified port 3000                                                                                                                   
http.createServer(app).listen(3000, function () {
  "use strict";
  console.log("Express server listening on port 3000");
});


// Create and return the word counts as a JSON object
app.get("/counts.json", function (req, res) {
  "use strict";
  var jsonObject;
  redisClient.mget(["happy", "sad", "happywords", "sadwords"], function (error, results) {
    if (error !== null) {
      console.log("ERROR: " + error);
    } else {
      jsonObject = {
        "happy": results[0],
        "sad": results[1],
        "happyarray": results[2],
        "sadarray": results[3]
      };
      res.json(jsonObject);
    }
  });
});