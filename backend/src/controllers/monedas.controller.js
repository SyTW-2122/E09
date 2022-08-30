
const monedasCtrl = {}

const Moneda = require('../models/moneda')

monedasCtrl.getMonedas = async (req, res) => {
    const monedas = await Moneda.find()
    monedas.forEach(moneda => (
         moneda.tags = null,
         moneda.marketdom= null,
         moneda.p30d= null,
         moneda.p60d= null,
         moneda.p90d= null,
         moneda.volumen24h= null,
         moneda.volumenchange24= null,
         moneda.maxsupply= null))

    res.json(monedas)
}

monedasCtrl.getMoneda = async (req, res) => {
    const moneda = await Moneda.findOne({ "nombre": req.params.nombre })
    res.json(moneda)
}


module.exports = monedasCtrl