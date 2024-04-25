import app from '../src/index'
import request from 'supertest'

describe('GET /trajectories', () => {
    test('It should respond with a status code 200', async () => {
        const response = await request(app).get('/api/trajectories').send()
        console.log('MI RESPONSE', response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.length > 0).toBe(true)
    })
})