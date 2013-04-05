var worker = function () {
  "use strict";
  var twitter = require("ntwitter"),
  redis = require("redis"),
  credentials = require("./credentials.js"),
  client = redis.createClient(),
    t = new twitter({
      consumer_key: credentials.consumer_key,
      consumer_secret: credentials.consumer_secret,
      access_token_key: credentials.access_token_key,
      access_token_secret: credentials.access_token_secret
    }),
    happyArray = ["happy", "ecstatic", "joyful"],
    sadArray = ["sad", "depressed", "morose"],
    trackedArray = happyArray.concat(sadArray),
    i,
    j,
    happyString = happyArray.join(", "),
    sadString = sadArray.join(", ");

  client.set("happywords", happyString);
  client.set("sadwords", sadString);

  t.stream(
    'statuses/filter',
    { track: trackedArray },
    function(stream) {
      stream.on("data", function(tweet) {
        //console.log(tweet.text);

        for (i = 0; i < happyArray.length; i += 1) {
          if (tweet.text.indexOf(happyArray[i]) > -1) {
            client.incr("happy");
          }
        }

        for (j = 0; j < sadArray.length; j += 1) {
          if (tweet.text.indexOf(sadArray[j]) > -1) {
            client.incr("sad");
          }
        }
      });
    }
  );
};
module.exports = worker;