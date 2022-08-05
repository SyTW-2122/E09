const { Router } = require('express');
const router = Router()

const buysCtrl = require('../controllers/buys.controllers.js') 

//create a route for the root path
router.get('/buys', buysCtrl.getBuys)

router.post('/buys', buysCtrl.createBuy)

router.get('/buys/:id', buysCtrl.getBuy)

router.put('/buys/:id', buysCtrl.updateBuy)

router.delete('/buys/:id', buysCtrl.deleteBuy)


module.exports = router