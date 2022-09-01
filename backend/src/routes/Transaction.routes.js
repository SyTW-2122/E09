const { Router } = require('express');
const router = Router()

const TransactionsCtrl = require('../controllers/Transactions.controllers.js') 

//create a route for the root path
router.get('/transactions', TransactionsCtrl.getTransactions)

router.post('/transactions', TransactionsCtrl.createTransaction)

router.get('/transactions/:token', TransactionsCtrl.getTransaction)

router.put('/transactions/:token', TransactionsCtrl.updateTransaction)

router.delete('/transactions/:token', TransactionsCtrl.deleteTransaction)


module.exports = router