const Bot = require('messenger-bot')
const request = require('request')
const express = require('express')
const bodyParser = require("body-parser");
const http = require('http')


let bot = new Bot({
  token: 'EAALViQNc1LgBADkj9bPZBjFwaHZB70tkloPYbgZBZAtUki8edZB8SU72rcJT2F6ZB3DnYFmdm6SlZCRkk9BJTYZCoigvrdpX2puTCvDom8lFucRnWRKGJ5B1rPZBeWjx1ilY8ecibTVt5E9Nli4bZAa3MvqAZCLwnCwS6pOW7eSOuKAlgZDZD',
  verify: process.env.VERIFICATION_TOKEN,
  app_secret: '1b6570300baa8ce5cfdcd349167a1a73'
})


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

http.createServer(bot.middleware()).listen(5000)
console.log('Echo bot server running at port 5000.')