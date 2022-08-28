const app = require('../app');
const mongoose = require("mongoose");
const supertest = require('supertest');
const api = supertest(app)
const server = require('../index')
const usuarios = [
    {
        username: "Prueba",
        email: "Prueba@gmail.com",
        password: "Contraseña",
    },
    {
        email: "Prueba@gmail.com",
        password: "Contraseña",
    },
]
const transacciones = [
    {
        nombreUsuario: "Juan",
        nombreMoneda: "BTC",
        cantidad: 5,
        precio: 10,
        tipo: "compra",
        fecha: "10-5-22",
    },
    {
        nombreUsuario: "pedro",
        nombreMoneda: "ETH",
        cantidad: 7,
        precio: 100,
        tipo: "compra",
        fecha: "10-5-22",
    },
]
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
    describe('transactions', () => {
        test('get transacitions should respond with 200 status code and json', async () => {
            await api.get('/transactions')
                .expect(200)
                .expect('Content-Type', /application\/json/)
        })
        test('post transaction should respond with 200 status code', async () => {
            await api.post('/transactions').send(transacciones[0])
                .expect(200)
        })
        test('delete transaction by username should respond with 200 status code and json', async () => {
            await api.delete('/transactions/Juan')
                .expect(200)
        })
        test('get transaction by username should respond with 200 status code and json', async () => {
            await api.get('/transactions/Pepito')
                .expect(200)
                .expect('Content-Type', /application\/json/)
        })
        test('put transaction by username should respond with 200 status code and json', async () => {
            await api.put('/transactions/Pepito').send(transacciones[0])
                .expect(200)
        })
    })
    describe('login', () => {
        test('register should respond with 200 status code', async () => {
            await api.post('/register/').send(usuarios[0])
                .expect(200)
        })
        test('login should respond with 200 status code', async () => {
            await api.post('/login/').send(usuarios[0])
                .expect(200)
        })

        test('login should respond with 200 status code', async () => {
            await api.delete('/dUser/').send(usuarios[0])
                .expect(200)
        })

    })
    describe('prueba monedas', () => {
        test('register should respond with 200 status code', async () => {
            await api.get('/monedas/')
                .expect(200)
        })
        test('register should respond with 200 status code', async () => {
            await api.get('/monedas/BTC')
                .expect(200)
        })
    })
})
afterAll(async () => {
    await mongoose.connection.close()
    await server.close()
})