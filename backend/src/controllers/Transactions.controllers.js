
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
    const transaction = await Transaction.find({"nombreUsuario": req.params.nombre})
    res.json(transaction) 
}
TransactionsCtrl.updateTransaction = async (req, res) => { 
    const transaction = await Transaction.findOneAndUpdate({"nombreUsuario": req.params.nombre}, req.body)
    res.json(`Se ha actualizado el objeto con nombre: ${req.params.nombre}`)
}
TransactionsCtrl.deleteTransaction = async (req, res) => { 
    const transaction = await Transaction.findOneAndDelete({"nombreUsuario": req.params.nombre}, req.params.nombreUsuario)
    res.json(`Se ha eliminado el siguiente objeto: ${transaction}`)
}
module.exports = TransactionsCtrl