const axios = require('axios');
const { default: mongoose } = require('mongoose');
require('../database')
const monedaModel = require("../models/moneda")

let response = null;
new Promise(async (resolve, reject) => {
  try {
    response = await axios.get('https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=BTC,ETH', {
      headers: {
        'X-CMC_PRO_API_KEY': '843a213d-49d0-413f-b73f-f90f01d449b7',
      },
    });
  } catch(ex) {
    response = null;
    // error
    console.log(ex);
    reject(ex);
  }
  if (response) {
    // success
    const monedas = response.data["data"];
    for (let moneda in monedas){
      const monedaBD = await monedaModel.find({"nombre": monedas[moneda]["symbol"]})
      if (monedaBD.length == 0) {
        // Se crea una nueva moneda en la BD
        nuevaMoneda = new monedaModel({ nombre: monedas[moneda]["symbol"], precio: monedas[moneda]["quote"]["USD"]["price"], supply: monedas[moneda]["circulating_supply"] })
        await nuevaMoneda.save()
      }
      else {
        // Se actualiza la moneda ya existente en la BD
        nuevaMoneda = { nombre: monedas[moneda]["symbol"], precio: monedas[moneda]["quote"]["USD"]["price"], supply: monedas[moneda]["circulating_supply"] }
        await monedaModel.findOneAndReplace({nombre: monedas[moneda]["symbol"]}, nuevaMoneda)
      }
    }

    //console.log(monedas);
    resolve(monedas);
  }
});
