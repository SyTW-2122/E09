const app = require('../app');
const request = require('supertest');

//start the server
const server = app.listen(app.get('port'), () => {
    console.log(`Example app listening at http://localhost:${app.get('port')}`);
})

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.use(require('../routes/buy.routes'));
///////

describe('App', () => {
    test('should respond with 200 status code', async () => {
        const response = await request(app).get('/');
        //console.log(response)
        expect(response.statusCode).toBe(200);
        await server.close()
        console.log("Server closed")
    }
    );
})