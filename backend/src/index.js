const app = require('./app');
require('./database')

//start the server
app.listen((process.env.PORT || app.get('port')), () => {
    console.log(`Example app listening at http://localhost:${app.get('port')}`);
})

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.use(require('./routes/Transaction.routes'));
app.use(require('./routes/login.routes'));

