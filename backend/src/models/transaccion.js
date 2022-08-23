const mongoose = require("mongoose"); 

const transaccionSchema = mongoose.Schema({
  nombreUsuario: { type: String, required: true, unique: true},
  nombreMoneda: { type: String, required: true},
  cantidad: { type: Number, required: true},
  precio: { type: Number, required: true},
  tipo: { type: String, required: true},
  fecha: { type: Date, required: true},
})
const transaccionModel= mongoose.model('Transaction',transaccionSchema) 
transaccionModel.fecha instanceof Date
module.exports = transaccionModel
