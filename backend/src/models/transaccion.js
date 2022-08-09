const monedaModel = require("./moneda")
const mongoose = require("mongoose"); 

const transaccionSchema = mongoose.Schema({
  tipo: String,
  moneda: monedaModel.schema,
  precio: Number,
})
const transaccionModel= mongoose.model('Transaccion',transaccionSchema) 
module.exports = transaccionModel
