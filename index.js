const Bot = require('messenger-bot')
const request = require('request')
const express = require('express')
const bodyParser = require("body-parser");



var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.listen((process.env.PORT || 5000));


console.log('Echo bot server running at port 3000.')


app.get("/", function (req, res) {
  res.send("Deployed!");
});

app.get("/webhook", function (req, res) {
  if (req.query["hub.verify_token"] === "this_is_my_token") {
    console.log("Verified webhook");
    res.status(200).send(req.query["hub.challenge"]);
  } else {
    console.error("Verification failed. The tokens do not match.");
    res.sendStatus(403);
  }
});