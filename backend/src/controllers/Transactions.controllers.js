
const TransactionsCtrl = {}

const Transaction = require('../models/transaccion')

TransactionsCtrl.getTransactions = async (req, res) => { 
    const transactions = await Transaction.find()
    res.json(transactions) 
}
TransactionsCtrl.createTransaction = async (req, res) => { 
    const newTransaction = new Transaction(req.body)
    await newTransaction.save()
    console.log(newTransaction)
    res.send(`This object was created:  ${newTransaction}`) 
}
TransactionsCtrl.getTransaction = async (req, res) => { 
    const transaction = await Transaction.findById(req.params.nombreUsuario)
    console.log(req.params.nombreUsuario)
    res.json(transaction) 
}
TransactionsCtrl.updateTransaction = async (req, res) => { 
    const transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body)
    console.log(req.params.id)
    res.json(`Se ha actualizado el objeto con id: ${req.params.id}`)
}
TransactionsCtrl.deleteTransaction = async (req, res) => { 
    const transaction = await Transaction.findByIdAndDelete(req.params.id)
    console.log(req.params.id)
    res.json(`Se ha eliminado el siguiente objeto: ${transaction}`)
}
module.exports = TransactionsCtrl