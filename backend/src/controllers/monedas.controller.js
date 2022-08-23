
const monedasCtrl = {}

const Moneda = require('../models/moneda')

monedasCtrl.getMonedas = async (req, res) => { 
    const monedas = await Moneda.find()
    res.json(monedas) 
}

monedasCtrl.getMoneda = async (req, res) => { 
    const moneda = await Moneda.findOne({"nombre": req.params.nombre})
    res.json(moneda) 
}


module.exports = monedasCtrl