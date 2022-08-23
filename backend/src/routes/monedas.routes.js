const { Router } = require('express');
const router = Router()

const monedasCtrl = require('../controllers/monedas.controller.js') 

//create a route for the root path
router.get('/monedas', monedasCtrl.getMonedas)

router.get('/monedas/:nombre', monedasCtrl.getMoneda)


module.exports = router