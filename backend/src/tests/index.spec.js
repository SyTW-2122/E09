import app from '../appjs';
import request from 'supertest';

describe('App', () => {
    test('should respond with 200 status code', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
    }
    );
})