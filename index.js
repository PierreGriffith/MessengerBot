
const request = require('request')
const express = require('express')
const bodyParser = require("body-parser");


var mongoose = require("mongoose");

var db = mongoose.connect(process.env.MONGODB_URI);
var Ordi = require("./models/ordinateur");
var Type = require("./models/type");
var User = require("./models/user");


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
    req.body.entry.forEach(function(entry) 
    {
      if (entry.messaging == undefined) {
      // Iterate over each messaging event
        entry.standby.forEach(function(event){
            if (event.postback) {
                processPostback(event);
            }
        });
      }
            
        else {
        entry.messaging.forEach(function(event) {
        if (event.postback) {
          processPostback(event);
        }});
        }
    
    
    });

    res.sendStatus(200);
  }
});


function processPostback(event) {
  var recipient_id = event.sender.id;
  var payload = event.postback.payload;

  if (payload === "Greeting") {
      insertname_db(recipient_id)
    
      User.find( {user_id: recipient_id}, function(err, res){ 
      
        if (err) {
            console.log("Message d'introduction raté")
        } else {
      var first_message = "Bonjour" + res["name"] + "je suis un bot créé par Melchior et je vais vous trouver l'ordinateur idéal"
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
            
            }
        })
      }
}


/* FUNCTION FOR DATABASE */

function insertname_db(recipent_id)
{  
    var tmp_name
    var tmp_lastname
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
      } else  {
            var bodyObj = JSON.parse(body);
            response = bodyObj.first_name;
            
          var tmp_user = new User({
                 user_id: recipent_id,
                 name: response,
                last_name: "",
                type : "",
                budget: "",
            })
          
          User.find( {user_id : recipent_id}, function(err, res) {
              if (res.length == 0) 
              {
                  console.log(res.length + "ALLLO")
                  tmp_user.save(function (err, data) {
                if (err) console.log("failed to save user" + err);
                else console.log('Saved ', data ); });
              }
                else 
                    return 
            }) 
      }    
    });
}


/*       FUNCTION FOR FACEBOOK       */


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

