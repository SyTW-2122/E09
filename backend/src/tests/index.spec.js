const app = require('../app');
const request = require('supertest');

describe('App', () => {
    test('should respond with 200 status code', async () => {
        const response = await request(app).get('/');
        console.log(response)
        expect(response.statusCode).toBe(200);
    }
    );
})