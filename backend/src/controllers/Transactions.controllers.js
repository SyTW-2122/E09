
const TransactionsCtrl = {}

const { ConnectionClosedEvent } = require('mongodb')
const Transaction = require('../models/transaccion')
const Moneda = require('../models/moneda')

TransactionsCtrl.getTransactions = async (req, res) => {
    const transactions = await Transaction.find()
    res.json(transactions)
}
TransactionsCtrl.createTransaction = async (req, res) => {
    const newTransaction = new Transaction(req.body)
    await newTransaction.save()
    res.send(`This object was created:  ${newTransaction}`)
}
TransactionsCtrl.getTransaction = async (req, res) => {
    const transactions = await Transaction.find({ "nombreUsuario": req.params.nombre})
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
            monedasDeUsuario.push(transactionItem.nombreMoneda)
            transactions.forEach(transactionToken =>  {
                // Buscamos todas las transacciones con el nombre de la moneda en especifico
                if (transactionItem.nombreMoneda == transactionToken.nombreMoneda) {
                    if (transactionToken.tipo == "compra") {// Calculamos las compras de esa moneda
                        compras -= transactionToken.cantidad * transactionToken.precio
                        cantidad += transactionToken.cantidad
                    } else { // Calculamos las ventas de esa moneda
                        ventas += transactionToken.cantidad * transactionToken.precio
                        cantidad -= transactionToken.cantidad
                    }
                    // creamos el JSON con los datos que contendra nuestra respuesta
                }
            }) //cierre for moneda individual
            index = monedasBD.findIndex(element => element.symbol == transactionItem.nombreMoneda)
            const precio_actual = monedasBD[index].precio
            let rendimiento = compras + ventas + precio_actual*cantidad
            let objeto = {
                "nombreMoneda": transactionItem.nombreMoneda,
                "rendimiento": rendimiento,
                "cantidad": cantidad,
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
    const transaction = await Transaction.findOneAndUpdate({ "nombreUsuario": req.params.nombre }, req.body)
    res.json(`Se ha actualizado el objeto con nombre: ${req.params.nombre}`)
}
TransactionsCtrl.deleteTransaction = async (req, res) => {
    const transaction = await Transaction.findOneAndDelete({ "nombreUsuario": req.params.nombre }, req.params.nombreUsuario)
    res.json(`Se ha eliminado el siguiente objeto: ${transaction}`)
}
module.exports = TransactionsCtrl