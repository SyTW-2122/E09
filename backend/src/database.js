const mongoose = require("mongoose"); 
const monedaModel = require("./models/moneda")
const transaccionModel = require("./models/transaccion")
const userModel = require("./models/usuario")

const uri = "mongodb+srv://usuario:usuario@cluster0.a1unt.mongodb.net/portfolios?retryWrites=true&w=majority";
mongoose.connect(uri).then(()=>{
  console.log("database conected")
}).catch(err => {
  console.error(err)
})
  
  //Prueba de database
  moneda1 = new monedaModel({
    nombre: "pvu",
    precio: 0,
    supply: 1000,
  })
compra1= new transaccionModel({
  tipo: "compra",
  moneda: moneda1,
  precio: 200,
})
venta2=new transaccionModel({
  tipo: "venta",
  moneda: moneda1,
  precio: 200,
})
usuario= new userModel({
  compras: [compra1,compra1,compra1,compra1],
  ventas: [venta2],
  monedas_activas: [moneda1]
})

  usuario.save()
  .then(result => {
    console.log(result)
  })
  .catch(err => {
    console.log(err)
  })
 
console.log(moneda1.precio)
mongoose.connection.close()
