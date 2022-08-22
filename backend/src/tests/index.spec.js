const app = require('../app');
const mongoose = require("mongoose"); 
const supertest = require('supertest');
const api = supertest(app)
const server= require('../index')
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
    test('should respond with 200 status code and json', async () =>{
        await api.get('/transactions')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })
})
afterAll(()=>{
    mongoose.connection.close()
    server.close() 
})