const monedaModel = require("./moneda")
const mongoose = require("mongoose"); 

const transaccionSchema = mongoose.Schema({
  nombre: { type: String, required: true},
  cantidad: { type: Number, required: true},
  precio: { type: Number, required: true},
  tipo: { type: String, required: true},
  fecha: { type: Date, required: true},
})
const transaccionModel= mongoose.model('Transaccion',transaccionSchema) 
transaccionModel.fecha instanceof Date
module.exports = transaccionModel