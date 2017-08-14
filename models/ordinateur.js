var mongoose = require("mongoose");
var Schema = mongoose.Schema;

 
var ordi_schema = new Schema({
  ordi_id: {type: String},
  link: {type: String},
  name: {type: String},
    
});

module.exports = mongoose.model("ordi", ordi_schema);

