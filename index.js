const Bot = require('messenger-bot')
const request = require('request')
const express = require('express')
const bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.listen((process.env.PORT || 5000));


let bot = new Bot({
  token: 'EAALViQNc1LgBADkj9bPZBjFwaHZB70tkloPYbgZBZAtUki8edZB8SU72rcJT2F6ZB3DnYFmdm6SlZCRkk9BJTYZCoigvrdpX2puTCvDom8lFucRnWRKGJ5B1rPZBeWjx1ilY8ecibTVt5E9Nli4bZAa3MvqAZCLwnCwS6pOW7eSOuKAlgZDZD',
  verify: '797734397072568',
  app_secret: '1b6570300baa8ce5cfdcd349167a1a73'
})


app.get("/", function (req, res) {
  res.send("Deployed!");
});


app.get("/webhook", function (req, res) {
      if (req.query["hub.verify_token"] === process.env.VERIFICATION_TOKEN) {
    console.log("Verified webhook");
    res.status(200).send(req.query["hub.challenge"]);
  } else {
    console.error("Verification failed. The tokens do not match.");
    res.sendStatus(403);
  }
});


bot.on('error', (err) => {
  console.log(err.message)
})

bot.on('message', (payload, reply) => {
  let text = payload.message.text

  bot.getProfile(payload.sender.id, (err, profile) => {
    if (err) throw err

    reply({ text }, (err) => {
      if (err) throw err

      console.log(`Echoed back to ${profile.first_name} ${profile.last_name}: ${text}`)
    })
  })
})