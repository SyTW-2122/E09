const { Router } = require('express');
const router = Router()

const TransactionsCtrl = require('../controllers/Transactions.controllers.js') 

//create a route for the root path
router.get('/transactions', TransactionsCtrl.getTransactions)

router.post('/transactions', TransactionsCtrl.createTransaction)

router.get('/transactions/:nombre', TransactionsCtrl.getTransaction)

router.put('/transactions/:nombre', TransactionsCtrl.updateTransaction)

router.delete('/transactions/:nombre', TransactionsCtrl.deleteTransaction)


module.exports = router