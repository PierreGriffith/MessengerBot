var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var type_schema = new Schema({
  type_id: {type: String},
  name: {type: String},
});

module.exports = mongoose.model("type", type_schema);