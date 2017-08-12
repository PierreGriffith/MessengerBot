const http = require('http')
const Bot = require('messenger-bot')

let bot = new Bot({
  token: 'EAALViQNc1LgBAKHgvRZCH5ZASsXVu4jyBU8QKuhqum1y1H8CzlZAcrIHrEDAcZCETMh5MXAiZAZCpsPMrtoNgF0YDTzn1Gu7Ppc0EgqW6tg8bKXaYjMYgE83H1dQBQZAj05RJG8VbRykEVZAkexEI7uzYWZBsjmDO5IdD58gB3JZAQuQZDZD',
  verify: 'VERIFY_TOKEN',
  app_secret: 'APP_SECRET'
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

http.createServer(bot.middleware()).listen(3000)
console.log('Echo bot server running at port 3000.')