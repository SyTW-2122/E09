const { Router } = require('express');
const router = Router()

const TransactionsCtrl = require('../controllers/Transactions.controllers.js') 

//create a route for the root path
router.get('/transactions', TransactionsCtrl.getTransactions)

router.post('/transactions', TransactionsCtrl.createTransaction)

router.get('/transactions/:id', TransactionsCtrl.getTransaction)

router.put('/transactions/:id', TransactionsCtrl.updateTransaction)

router.delete('/transactions/:id', TransactionsCtrl.deleteTransaction)


module.exports = router