// import app from '../../src/index'
// import request from 'supertest'
import { testApp } from '../config/setup'

let createdTrajectoryId = 0

describe('GET /trajectories', () => {
    test('It should respond with a status code 200', async () => {
        const response = await testApp.get('/api/trajectories').send()
        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toMatch(/application\/json/)
        expect(response.body.data.length > 0).toBe(true)
    })

    test("It should respond with an 'longitude' inside the body response", async () => {
        const response = await testApp.get('/api/trajectories').send()
        expect(Array.isArray(response.body.data)).toBe(true)
        expect(typeof response.body.data[1]).toBe('object')
        expect(response.body.data[1]).toHaveProperty('longitude')
        expect(typeof response.body.data[1].longitude).toBe('number')
    })

    test('It should respond with 10 trajectories as result', async () => {
        const response = await testApp.get('/api/trajectories/?page=1&limit=10').send()
        expect(Array.isArray(response.body.data)).toBe(true)
        expect(response.body.data).toHaveLength(10)
    })

    test('It should respond with a status code 400 when page parameter has a non valid value', async () => {
        const response = await testApp.get('/api/trajectories/?page=page&limit=10').send()
        expect(response.status).toBe(400)
        expect(response.body.message).toBe('The page parameter must be an integer')
    })
})

describe('POST /trajectories', () => {
    test('It should respond with a status code 201', async () => {
        const response = await testApp.post('/api/trajectories').send({
            id: 322,
            latitude: 12.123123,
            longitude: -72.123123,
        })
        createdTrajectoryId = response.body.data.id
        expect(response.status).toBe(201)
        expect(response.headers['content-type']).toMatch(/application\/json/)
        expect(response.body.message).toBe('Successful operation')
        expect(response.body.data.taxi_id).toBe(322)
        expect(response.body.data).toHaveProperty('latitude')
        expect(response.body.data).toHaveProperty('longitude')
    })

    test('It should respond with a status code 400 when latitude is not provided', async () => {
        const response = await testApp.post('/api/trajectories').send({
            id: 12,
        })
        expect(response.status).toBe(400)
        expect(response.body.message).toBe('latitude field is missing, please verify your request.')
    })

    test('It should respond with a status code 400 when longitude is not provided', async () => {
        const response = await testApp.post('/api/trajectories').send({
            id: 12,
            latitude: 12.123123,
        })
        expect(response.status).toBe(400)
        expect(response.body.message).toBe('longitude field is missing, please verify your request.')
    })

    test('It should respond with a status code 400 when id filed has a non valid value', async () => {
        const response = await testApp.post('/api/trajectories').send({
            id: 'taxi_id',
            latitude: 12.123123,
            longitude: -72.123123,
        })
        expect(response.status).toBe(400)
        expect(response.body.message).toBe('The id field must be an integer')
    })
})

describe('GET /lastTrajectory', () => {
    test('It should respond with a status code 200', async () => {
        const response = await testApp.get('/api/trajectories/lastest').send()
        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toMatch(/application\/json/)
        expect(Array.isArray(response.body.data)).toBe(true)
        expect(response.body.data.length > 0).toBe(true)
    })

    test('It should respond with 10 trajectories as result', async () => {
        const response = await testApp.get('/api/trajectories/lastest?page=1&&limit=10').send()
        expect(response.body.data).toHaveLength(10)
    })

    test('It should respond with a status code 400 when page parameter has a non valid value', async () => {
        const response = await testApp.get('/api/trajectories/?page=page&limit=10').send()
        expect(response.status).toBe(400)
        expect(response.body.message).toBe('The page parameter must be an integer')
    })
})

describe('DELETE /trajectories', () => {
    test('It should respond with a status code 200 when delete a register', async () => {
        const response = await testApp.delete(`/api/trajectories/${createdTrajectoryId}`).send()
        expect(response.status).toBe(200)
        expect(response.body.message).toBe('Data deleted successfully')
    })

    test('It should respond with a status code 400 when trajectoryId parameter has a non valid value', async () => {
        const response = await testApp.delete('/api/trajectories/12sdf').send()
        expect(response.status).toBe(400)
        expect(response.body.message).toBe('The trajectory id must be an integer')
    })
})
