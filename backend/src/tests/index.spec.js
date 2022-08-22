const app = require('../app');
const mongoose = require("mongoose"); 
const supertest = require('supertest');
const api = supertest(app)
const server= require('../index')
const TransactionsCtrl = require('../controllers/Transactions.controllers')
//start the server
/*const server = app.listen(app.get('port'), () => {
    console.log(`Example app listening at http://localhost:${app.get('port')}`);
})*/



/*app.use(require('../routes/Transaction.routes'));
app.use(require('../routes/login.routes'));*/

///////

describe('App', () => {
    test('should respond with 200 status code', async () => {
        const response = await api.get('/');
        //console.log(response)
        expect(response.statusCode).toBe(200);
    }
    );
    test('a ver qie pasa', async () =>{
        await api.get('/transactions', TransactionsCtrl.getTransactions)
        expect(200);
    })
})
afterAll(()=>{
    mongoose.connection.close()
    server.close() 
})