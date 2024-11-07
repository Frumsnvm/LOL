const request = require('supertest');
const app = require('../server'); // Upravte podle struktury

describe('GET /api', () => {
    it('should return JSON object', async () => {
        const response = await request(app).get('/api');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ organization: "Student Cyber Games" });
    });
});
