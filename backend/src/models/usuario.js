const monedaModel = require("./moneda");
const transaccionModel = require("./transaccion");
const mongoose = require("mongoose"); 

 //schema que debe cumpplir los usuarios de la bbdd

 const userSchema = new mongoose.Schema ({
  compras: [transaccionModel.schema],
  ventas: [transaccionModel.schema],
  monedas_activas: [monedaModel.schema]
})
 const userModel= mongoose.model('Usuario',userSchema)
module.exports = userModel