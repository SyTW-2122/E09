const app = require('./app');
require('./database')
//require('./cmc-api/CMC') Se descomenta para actualizar las monedas

const PORT = process.env.PORT || 4000 

//start the server
server = app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
})

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.use(require('./routes/Transaction.routes'));
app.use(require('./routes/login.routes'));
app.use(require('./routes/monedas.routes'));


module.exports = server;