
const request = require('request')
const express = require('express')
const bodyParser = require("body-parser");


var mongoose = require("mongoose");

var db = mongoose.connect(process.env.MONGODB_URI);
var Ordi = require("./models/ordinateur");
var Type = require("./models/type");
var User = require("./models/user");
var apiai = require('apiai');


var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.listen((process.env.PORT || 5000));

var app_ai = apiai(process.env.CREDENTIALS_APIAI);

  var ordi1 = new User({
     ordi_id:"1" ,
    link: "https://www.amazon.com/gp/product/B06XJJG4PD/ref=s9_acss_bw_cg_cegwcacl_2b1_w?pf_rd_m=ATVPDKIKX0DER&pf_rd_s=unified-hybrid-3&pf_rd_r=MHCQN6707HB17D481YXH&pf_rd_t=101&pf_rd_p=18fb6928-37c1-4329-a8ec-2b500302e85b&pf_rd_i=565108" ,
    name:"mails" ,  
            })

  var ordi2 = new User({
     ordi_id: "2" ,
    link:"https://www.amazon.com/Lightweight-11-6-inch-Quad-Core-Microsoft-Subscription/dp/B01LT692RK/ref=zg_bs_565108_4?_encoding=UTF8&psc=1&refRID=ADWJ5Y7D2GG828EQ5917" ,
    name: "youtube",  
            })

  var ordi3 = new User({
     ordi_id: "3",
    link: "https://www.amazon.com/Acer-Predator-Processor-Graphics-G3-571-77QK/dp/B06Y4GZS9C/ref=lp_8588812011_1_1?s=pc&ie=UTF8&qid=1502703311&sr=1-1",
    name: "lol",  
            })

  var ordi4 = new User({
     ordi_id: "4",
    link: "https://www.amazon.com/Lenovo-Legion-Y520-i5-7300HQ-80WK00FHUS/dp/B06WVMJ713/ref=lp_8588812011_1_14?s=pc&ie=UTF8&qid=1502703311&sr=1-14" ,
    name: "csgo",  
            })

  var ordi5 = new User({
     ordi_id: "5",
    link: "https://www.amazon.fr/Microsoft-Surface-tactile-i5-g%C3%A9n%C3%A9ration/dp/B071H946XT/ref=sr_1_3?s=computers&ie=UTF8&qid=1502704919&sr=1-3&keywords=laptop",
    name:"adobe" ,  
            })

  var ordi6 = new User({
     ordi_id: "6",
    link: "https://www.amazon.com/gp/product/B06XJJG4PD/ref=s9_acss_bw_cg_cegwcacl_2b1_w?pf_rd_m=ATVPDKIKX0DER&pf_rd_s=unified-hybrid-3&pf_rd_r=MHCQN6707HB17D481YXH&pf_rd_t=101&pf_rd_p=18fb6928-37c1-4329-a8ec-2b500302e85b&pf_rd_i=565108",
    name: "outlook",  
            })

  
      tmp_user.ordi1(function (err, data) {
                if (err) console.log("failed to save user" + err);
                else console.log('Saved ', data ); });

      tmp_user.ordi2(function (err, data) {
                if (err) console.log("failed to save user" + err);
                else console.log('Saved ', data ); });

      tmp_user.ordi3(function (err, data) {
                if (err) console.log("failed to save user" + err);
                else console.log('Saved ', data ); });

      tmp_user.ordi4(function (err, data) {
                if (err) console.log("failed to save user" + err);
                else console.log('Saved ', data ); });

      tmp_user.ordi5(function (err, data) {
                if (err) console.log("failed to save user" + err);
                else console.log('Saved ', data ); });

      tmp_user.ordi6(function (err, data) {
                if (err) console.log("failed to save user" + err);
                else console.log('Saved ', data ); });


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
      if (entry.messaging == undefined) 
      {
      // Iterate over each messaging event
        
        entry.standby.forEach(function(event){
            if (event.postback) 
            {
                processPostback(event);
            } else if (event.message) 
            {
                processMessage(event);
            }
            
        });
      }
            
        else 
        {
        entry.messaging.forEach(function(event) {
        if (event.postback) 
        {
          processPostback(event);
        }
        else if (event.message) 
        {
                processMessage(event);
        }
            
        
        
        });
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
            
      var first_message = "Bonjour " + res[0].name + " je suis un bot qui a pour but de trouver quel type d'ordinateur vous chercher, par la suite je vous demanderais des spécifications"
      var buttons =  [
          {
            "type":"postback",  
            "title":"Gaming",
            "payload":"Gaming"
          },
          {
            "type":"postback",    
            "title":"Bureau",
            "payload":"Bureau"
          
          },          
          {
            "type":"postback",    
            "title":"Navigation",
            "payload":"Navigation"
          }
                     ]
      
        Sendbuttons(recipient_id, first_message, buttons)      
            
            }
        })
      }
    
    if (payload == "Gaming" ) 
    {
      sendmessage(recipient_id, {text: "Quels jeux ou quelle carte graphique vous plairait - il de voir"}); 
      inserttype_db(recipient_id, payload)
    }

      if (payload == "Bureau" ) 
      { 
      sendmessage(recipient_id, {text: "dans quoi travaillez vous ? ou quel suite de logiciels utilisez vous"}); 
      inserttype_db(recipient_id, payload)
      }
    
      if (payload == "Navigation" ) 
      { 
      sendmessage(recipient_id, {text: "quels site allez vous consultez"}); 
      inserttype_db(recipient_id, payload)
      }
      
}


function processMessage(event) 
{    
      
 var message = event.message;
 var senderId = event.sender.id;
 
    // You may get a text or attachment but not both
    
    
    if (message.text) 
    {        
        var request = app_ai.textRequest(message.text, {
            sessionId: 'pcmongallet'
        });
        
        request.on('response', function(response) 
        {
            var _obj = response.fulfillment.speech
            var res = _obj.toLowerCase();
            
            if (res == "mails")
                
            if (res == "youtube")
                
            if (res == "csgo")
                
            if (res == "lol")
            
            if (res == "adobe")
                
            if (res == "outlook")
            
                
            
        });

    request.on('error', function(error) {
        console.log(error);
    });
    
    request.end();

  }
}

/* FUNCTION FOR DATABASE */


function inserttype_db(recipent_id, message)
{
    User.find( {user_id : recipent_id}, function(err, res) {
              if (res.length == 0) 
              {
                  res.type = message  
                  tmp_user.save(function (err, data) {
                if (err) console.log("failed to save user" + err);
                else console.log('Saved ', data ); });
              }
                else 
                    return 
            }) 
}


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
      recipient: {id: recipent_id},
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

