const mongoose = require("mongoose"); 
 const monedaSchema = mongoose.Schema({
  nombre: { type: String, required: true, unique: true},
  precio: { type: Number, required: true},
  supply: { type: Number, required: true},
})
const monedaModel= mongoose.model('Moneda',monedaSchema) 
module.exports = monedaModel
