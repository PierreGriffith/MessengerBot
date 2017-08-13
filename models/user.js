var mongoose = require("mongoose");
var Schema = mongoose.Schema;
 

var user_schema = new Schema({
  user_id: {type: String},
  name: {type: String},
  last_name: {type: String},
  type : {type: String},
  budget: {type: String},
});

module.exports = mongoose.model("user", user_schema);