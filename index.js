
const request = require('request')
const express = require('express')
const bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.listen((process.env.PORT || 5000));

// Server index page
app.get("/", function (req, res) {
  res.send("Deployed!");
});

// Facebook Webhook
app.get("/webhook", function (req, res) {
  if (req.query["hub.verify_token"] === process.env.VERIFICATION_TOKEN) {
    console.log("Verified webhook");
    res.status(200).send(req.query["hub.challenge"]);
  } else {
    console.error("Verification failed");
    res.sendStatus(403);
  }
});


app.post("/webhook", function (req, res) {
  // Make sure this is a page subscription
  if (req.body.object == "page") {
    // Iterate over each entry
    // There may be multiple entries if batched
    req.body.entry.forEach(function(entry) {
      // Iterate over each messaging event
      entry.messaging.forEach(function(event) {
        if (event.postback) {
          processPostback(event);
        }
      });
    });

    res.sendStatus(200);
  }
});


function processPostback(event) {
  var recipient_id = event.sender.id;
  var payload = event.postback.payload;

  if (payload === "Greeting") {
      
      console.log(getname(recipient_id))
      /*
      sendmessage(recipient_id, getname(recipient_id))
      
      
      var name = getname(recipient_id)
      var first_message = "Bonjour" + name + "je suis un bot créé par Melchior et je vais vous trouver l'ordinateur idéal"
      var buttons =  [
          {
            "title":"Gaming"
          },
          {
            "title":"Bureau",
          },          
          {
            "title":"Navigation",
          }
                     ]
      
    Sendbuttons(recipient_id, first_message, buttons)
      
      */
      
      request({
      url: "https://graph.facebook.com/v2.6/" + recipient_id,
      qs: {
        access_token: process.env.PAGE_ACCESS_TOKEN,
        fields: "first_name"
      },
      method: "GET"
    }, function(error, response, body) {
      var greeting = "";
      if (error) {
        console.log("Error getting user's name: " +  error);
      } else {
        var bodyObj = JSON.parse(body);
        name = bodyObj.first_name;
        greeting = "Hi " + name + ". ";
      }
      var message = greeting + "My name is SP Movie Bot. I can tell you various details regarding movies. What movie would you like to know about?";
      sendMessage(recipient_id, {text: message});
    });
  
      
      
  }
}



function sendmessage(recipient_id, message) {
  request({
    url: "https://graph.facebook.com/v2.6/me/messages",
    qs: {access_token: process.env.PAGE_ACCESS_TOKEN},
    method: "POST",
    json: {
      recipient: {id: recipient_id},
      message: message,
    }
  }, function(error, response, body) {
    if (error) {
      console.log("Error sending message: " + response.error);
    }
  });
}


function getname(recipent_id){
     request({
      url: "https://graph.facebook.com/v2.6/" + recipent_id,
      qs: {
        access_token: process.env.PAGE_ACCESS_TOKEN,
        fields: "first_name"
      },
      method: "GET"
    }, function(error, response, body) {
      var greeting = "";
       if (error) {
        console.log("Error getting user's name: " +  error);
      }
         
         else {
            var bodyObj = JSON.parse(body);
            response = bodyObj.first_name;
            console.log(response)
            return response; 
      }  
    });
}



function Sendbuttons(recipent_id, button_message, buttons){
  request({
    url: "https://graph.facebook.com/v2.6/me/messages",
    qs: {access_token: process.env.PAGE_ACCESS_TOKEN},
    method: "POST",
    json: {
      recipient: {id: recipient_id},
      message:{
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"button",
        "text": button_message,
        "buttons": buttons
      }
    }
  } ,
        }
    }
          , function(error, response, body) {
    if (error) {
      console.log("Error sending message: " + response.error);
    }
  });
}

/*
function sendMessage(recipientId, message) {
  request({
    url: "https://graph.facebook.com/v2.6/me/messages",
    qs: {access_token: process.env.PAGE_ACCESS_TOKEN},
    method: "POST",
    json: {
      recipient: {id: recipientId},
      message:{
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"button",
        "text":"What do you want to do next?",
        "buttons":[
          {
            "type":"web_url",
            "url":"https://petersapparel.parseapp.com",
            "title":"Show Website"
          },
          {
            "type":"postback",
            "title":"Start Chatting",
            "payload":"USER_DEFINED_PAYLOAD"
          }
        ]
      }
    }
  } ,
        }
    }
          , function(error, response, body) {
    if (error) {
      console.log("Error sending message: " + response.error);
    }
  });
}

*/

