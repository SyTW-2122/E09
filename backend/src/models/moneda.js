const mongoose = require("mongoose"); 
 const monedaSchema = mongoose.Schema({
  nombre:            { type: String, required: true, unique: true},
  symbol:            { type: String, required: true},
  p1h:               { type: Number, required: true},
  p24h:              { type: Number, required: true},
  p7d:               { type: Number, required: true},
  p30d:              { type: Number, required: true},
  p60d:              { type: Number, required: true},
  p90d:              { type: Number, required: true},
  volumen24h:        { type: Number, required: true},
  volumenchange24h:  { type: Number, required: true},
  precio:            { type: Number, required: true},
  circulatingSupply: { type: Number, required: true},
  maxsupply:         { type: Number, required:false},
  marketcap:         { type: Number, required: true},
  marketdom:         { type: Number, required: true},
  tags:              { type: Array, required: true}

})
const monedaModel= mongoose.model('Moneda',monedaSchema) 
module.exports = monedaModel
