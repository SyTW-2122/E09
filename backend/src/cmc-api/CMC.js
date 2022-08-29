const axios = require('axios');
const monedaModel = require("../models/moneda")
//require('../database')

let response = null;
setInterval(function() {
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
      console.log("La petición a la API de CoinMarketCap ha sido iniciada.")
      const monedas = response.data["data"];
      for (let moneda in monedas){
        const monedaBD = await monedaModel.find({"nombre": monedas[moneda]["name"]})
        //console.log("Moneda: ", monedaBD)
        if (monedaBD.length == 0) {
          // Se crea una nueva moneda en la BD
          nuevaMoneda = new monedaModel({ 
            nombre: monedas[moneda]["name"],
            symbol: monedas[moneda]["symbol"],
            p1h: monedas[moneda]["quote"]["USD"]["percent_change_1h"],
            p24h: monedas[moneda]["quote"]["USD"]["percent_change_24h"],
            p7d: monedas[moneda]["quote"]["USD"]["percent_change_7d"],
            p30d: monedas[moneda]["quote"]["USD"]["percent_change_30d"],
            p60d: monedas[moneda]["quote"]["USD"]["percent_change_60d"],
            p90d: monedas[moneda]["quote"]["USD"]["percent_change_90d"],
            volumen24h: monedas[moneda]["quote"]["USD"]["volume_24h"],
            volumenchange24h: monedas[moneda]["quote"]["USD"]["volume_change_24h"],
            precio: monedas[moneda]["quote"]["USD"]["price"],
            circulatingSupply: monedas[moneda]["circulating_supply"],
            maxsupply: monedas[moneda]["max_supply"],
            marketcap: monedas[moneda]["quote"]["USD"]["market_cap"],
            marketdom: monedas[moneda]["quote"]["USD"]["market_cap_dominance"],
            tags: monedas[moneda]["tags"]
          })
          await nuevaMoneda.save()
        }
        else {
          // Se actualiza la moneda ya existente en la BD
          nuevaMoneda = { 
            nombre: monedas[moneda]["name"],
            symbol: monedas[moneda]["symbol"],
            p1h: monedas[moneda]["quote"]["USD"]["percent_change_1h"],
            p24h: monedas[moneda]["quote"]["USD"]["percent_change_24h"],
            p7d: monedas[moneda]["quote"]["USD"]["percent_change_7d"],
            p30d: monedas[moneda]["quote"]["USD"]["percent_change_30d"],
            p60d: monedas[moneda]["quote"]["USD"]["percent_change_60d"],
            p90d: monedas[moneda]["quote"]["USD"]["percent_change_90d"],
            volumen24h: monedas[moneda]["quote"]["USD"]["volume_24h"],
            volumenchange24h: monedas[moneda]["quote"]["USD"]["volume_change_24h"],
            precio: monedas[moneda]["quote"]["USD"]["price"],
            circulatingSupply: monedas[moneda]["circulating_supply"],
            maxsupply: monedas[moneda]["max_supply"],
            marketcap: monedas[moneda]["quote"]["USD"]["market_cap"],
            marketdom: monedas[moneda]["quote"]["USD"]["market_cap_dominance"],
            tags: monedas[moneda]["tags"]
          }
          await monedaModel.findOneAndReplace({nombre: monedas[moneda]["name"]}, nuevaMoneda)
        }
      }
      console.log("La petición a la API de CoinMarketCap ha sido finalizada.")
      //console.log(JSON.stringify(monedas));
      resolve(monedas);
    }
  });
}, 300000)
