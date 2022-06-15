const app = require('./app');

//Listen on port 3000
const port = 3000;

//start the server
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})

app.use(require('./routes/coin.routes'));