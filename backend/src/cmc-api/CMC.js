const axios = require('axios');
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
      nuevaMoneda = new monedaModel({ nombre: monedas[moneda]["symbol"], precio: monedas[moneda]["quote"]["USD"]["price"], supply: monedas[moneda]["circulating_supply"] })
      await nuevaMoneda.save()
    }

    //console.log(monedas);
    resolve(monedas);
  }
});
