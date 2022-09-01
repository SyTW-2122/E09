const jwt = require('jsonwebtoken')


const TransactionsCtrl = {}

const Transaction = require('../models/transaccion')
const Moneda = require('../models/moneda')

TransactionsCtrl.getTransactions = async (req, res) => {
    const transactions = await Transaction.find()
    res.json(transactions)
}
TransactionsCtrl.createTransaction = async (req, res) => {
    nombre = procesarToken(req.params.token)
    transaccion = req.body
    transaccion.nombreUsuario = nombre
    const newTransaction = new Transaction(transaccion)
    await newTransaction.save()
    res.json(newTransaction)
}
TransactionsCtrl.getTransaction = async (req, res) => {
    nombreUsuario = procesarToken(req.params.token)
    const transactions = await Transaction.find({ "nombreUsuario": nombreUsuario})
    const monedasBD = await Moneda.find({})
    let monedasDeUsuario = [];
    let comprasGenerales = 0;
    let ventasGenerales = 0;
    let transactionsResult = []
    transactions.forEach(async transactionItem => {
        if (transactionItem.tipo == "compra") { // Suma cantidades que has comprado
            comprasGenerales += transactionItem.cantidad * transactionItem.precio
        } else { // Suma cantidades que has vendido
            ventasGenerales += transactionItem.cantidad * transactionItem.precio
        }
        // Comprueba si la moneda ya ha sido calculada       
          if (!monedasDeUsuario.includes(transactionItem.nombreMoneda)) {
            let cantidad = 0;
            let compras = 0;
            let ventas = 0;
            let totalComprado = 0
            monedasDeUsuario.push(transactionItem.nombreMoneda)
            transactions.forEach(transactionToken =>  {
                // Buscamos todas las transacciones con el nombre de la moneda en especifico
                if (transactionItem.nombreMoneda == transactionToken.nombreMoneda) {
                    if (transactionToken.tipo == "compra") {// Calculamos las compras de esa moneda
                        totalComprado += transactionToken.cantidad
                        compras -= transactionToken.cantidad * transactionToken.precio
                        cantidad += transactionToken.cantidad
                    } else { // Calculamos las ventas de esa moneda
                        ventas += transactionToken.cantidad * transactionToken.precio
                        cantidad -= transactionToken.cantidad
                    }
                    // creamos el JSON con los datos que contendra nuestra respuesta
                }
            }) //cierre for moneda individual
            index = monedasBD.findIndex(element => element.nombre == transactionItem.nombreMoneda)
            const precio_actual = monedasBD[index].precio
            let rendimiento = compras + ventas + precio_actual*cantidad
            let objeto = {
                "nombre": transactionItem.nombreMoneda,
                "symbol": monedasBD[index].symbol,
                "inversion": -compras,
                "cantidad": cantidad,
                "precioactual": precio_actual,
                "preciocompra": (-compras)/totalComprado,
                "p24h": monedasBD[index].p24h,
                "p7d": monedasBD[index].p7d,
                "beneficios": rendimiento,
                "porcentajeRendimiento": -(rendimiento/compras * 100)   //(((ventas + precio_actual * cantidad) / -compras)*100)- 100
            }
            console.log(objeto)
            transactionsResult.push(objeto)
        }
    })
    /**Rendimiento de cada moneda */
    let respuesta = {
        "comprasGenerales":comprasGenerales,
        "ventasGenerales":ventasGenerales,
        "transactionsResult":transactionsResult
    }
    res.json(respuesta)
}
TransactionsCtrl.updateTransaction = async (req, res) => {
    nombre = procesarToken(req.params.token)
    id = req.params.id
    const transaction = await Transaction.findByIdAndUpdate(id, req.body)
    res.json(`Se ha actualizado el objeto con nombre: ${nombre}`)
}
TransactionsCtrl.deleteTransaction = async (req, res) => {
    nombre = procesarToken(req.params.token)
    moneda = req.params.moneda
    const transaction = await Transaction.deleteMany({ "nombreUsuario": nombre, "nombreMoneda": moneda })
    res.json(`Se ha eliminado el siguiente objeto: ${transaction}`)
}

function procesarToken(token) {
    let decoded = jwt.decode(token, "claveSecreta", true)
    return decoded.nombreUsuario
}

module.exports = TransactionsCtrl

