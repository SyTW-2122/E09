const app = require('./app');

//Listen on port 3000

//start the server
app.listen(app.get('port'), () => {
    console.log(`Example app listening at http://localhost:${app.get('port')}`);
})

app.use(require('./routes/buy.routes'));