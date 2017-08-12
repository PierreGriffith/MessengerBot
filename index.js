
const request = require('request')
const express = require('express')
const bodyParser = require("body-parser");

/*
let bot = new Bot({
  token: 'EAALViQNc1LgBADkj9bPZBjFwaHZB70tkloPYbgZBZAtUki8edZB8SU72rcJT2F6ZB3DnYFmdm6SlZCRkk9BJTYZCoigvrdpX2puTCvDom8lFucRnWRKGJ5B1rPZBeWjx1ilY8ecibTVt5E9Nli4bZAa3MvqAZCLwnCwS6pOW7eSOuKAlgZDZD',
  verify: process.env.VERIFICATION_TOKEN,
  app_secret: '1b6570300baa8ce5cfdcd349167a1a73'
})
*/


var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.listen((process.env.PORT || 5000));

// Server index page
app.get("/", function (req, res) {
  res.send("Deployed!");
});

// Facebook Webhook
// Used for verification
app.get("/webhook", function (req, res) {
  if (req.query["hub.verify_token"] === process.env.VERIFICATION_TOKEN) {
    console.log("Verified webhook");
    res.status(200).send(req.query["hub.challenge"]);
  } else {
    console.error("Verification failed. The tokens do not match.");
    res.sendStatus(403);
  }
});