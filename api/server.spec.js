const request = require('supertest');

const server = require('./server.js');

describe('the api layer', () => {
    describe('get /', () => {
        it('responds with 200', async () => {
            const response = await request(server).get('/');
            expect(response.status).toBe(200);
        });

        it('responds with json', async () => {
            const response = await request(server).get('/');
            expect(response.type).toMatch(/json/i);
        });

        it('sends correct response object', async () => {
            const response = await request(server).get('/');
            expect(response.body).toEqual([]);
        });
    });

    describe('post /', () => {

        it('response with 422 if info missing', async () => {
            const body = {
                title: 'Pacman', // required
                releaseYear: 1980 // not required
              };
            const response = await request(server).post('/').send(body);
            expect(response.status).toBe(422);
        })

        it('responds with 400', async () => {
            const body = {
                title: 'Pacman', // required
                genre: 'Arcade', // required
                releaseYear: 1980 // not required
              };
            const response = await request(server).post('/').send(body);
            expect(response.status).toBe(400);
        });

        it('responds with array', async () => {
            const body = {
                title: 'Pacman', // required
                genre: 'Arcade', // required
                releaseYear: 1980 // not required
              };
            const response = await request(server).post('/').send(body);
            expect(response.body.length).toBe(1);
        });
        
    })
})