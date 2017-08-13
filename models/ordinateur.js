var mongoose = require("mongoose");
var Schema = mongoose.Schema;

 
var ordi_schema = new Schema({
  ordi_id: {type: String},
  link: {type: String},
  prix: {type: String},
  cpu : {type: String},
  ram : {type: String},
  memory : {type: String}
    
});

module.exports = mongoose.model("ordi", ordi_schema);

