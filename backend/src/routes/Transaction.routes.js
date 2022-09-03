const { Router } = require('express');
const router = Router()

const TransactionsCtrl = require('../controllers/Transactions.controllers.js') 

//create a route for the root path
router.get('/transactions/history/:token', TransactionsCtrl.getTransactions)

router.post('/transactions/:token', TransactionsCtrl.createTransaction)

router.get('/transactions/:token', TransactionsCtrl.getTransaction)

router.put('/transactions/:token/:id', TransactionsCtrl.updateTransaction)

router.delete('/transactions/:token/:moneda', TransactionsCtrl.deleteTransaction)


module.exports = router