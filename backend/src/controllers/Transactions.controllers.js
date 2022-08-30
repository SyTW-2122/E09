
const TransactionsCtrl = {}

const Transaction = require('../models/transaccion')

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
    const transactionCompra = await Transaction.find({ "nombreUsuario": req.params.nombre, "tipo": "compra" })
    const transactionVenta = await Transaction.find({ "nombreUsuario": req.params.nombre, "tipo": "venta" })
    let compras = 0;
    let ventas = 0;
    let cantidad=0;
    transactionCompra.forEach(transactionItem => (
        compras += transactionItem.cantidad * transactionItem.precio,
        cantidad += transactionItem.cantidad
    )
    )
    transactionVenta.forEach(transactionItem => (
        ventas += transactionItem.cantidad * transactionItem.precio,
        cantidad -= transactionItem.cantidad
        ))
        console.log("compras", compras)
        console.log("ventas", ventas)
        console.log("p")
    res.json(transactionCompra)
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