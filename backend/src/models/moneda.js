const mongoose = require("mongoose"); 
 const monedaSchema = mongoose.Schema({
  nombre: String,
  precio: Number,
  supply: Number,
})
const monedaModel= mongoose.model('Moneda',monedaSchema) 
module.exports = monedaModel
