const app = require('./app');

//start the server
app.listen(app.get('port'), () => {
    console.log(`Example app listening at http://localhost:${app.get('port')}`);
})

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.use(require('./routes/buy.routes'));

