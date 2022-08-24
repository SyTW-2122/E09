const axios = require('axios');
const monedaModel = require("../models/moneda")

const interval = setInterval(function() {
  let response = null;
  new Promise(async (resolve, reject) => {
    try {
      response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=BTC,ETH,USDT,BNB,XRP,ADA,SOL,DOGE,DOT,SHIB,AVAX,MATIC,TRX,UNI,LTC,ATOM,LINK,XMR,XLM,ALGO', {
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
      console.log("La petición a la API de CoinMarketCap ha sido realizada.")
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
}, 300000)