// import app from '../../src/index'
// import request from 'supertest'
import { testApp } from '../config/setup'

describe('GET /taxis', () => {
    test('It should respond with a status code 200', async () => {
        const response = await testApp.get('/api/taxis').send()
        expect(response.status).toBe(200)
        expect(response.body.data.length > 0).toBe(true)
    })

    test("It should respond with an 'id' inside the body response", async () => {
        const response = await testApp.get('/api/taxis').send()
        expect(Array.isArray(response.body.data)).toBe(true)
        expect(typeof response.body.data[1]).toBe('object')
        expect(response.body.data[1]).toHaveProperty('id')
        expect(typeof response.body.data[1].id).toBe('number')
    })

    test("It should respond with an 'plate' inside the body response", async () => {
        const response = await testApp.get('/api/taxis').send()
        expect(Array.isArray(response.body.data)).toBe(true)
        expect(typeof response.body.data[1]).toBe('object')
        expect(response.body.data[1]).toHaveProperty('plate')
        expect(typeof response.body.data[1].plate).toBe('string')
    })

    test('It should respond with 10 taxis as result', async () => {
        const response = await testApp.get('/api/taxis').send()
        expect(response.body.data).toHaveLength(10)
    })

    test('It should respond with 4 taxis as result', async () => {
        const response = await testApp.get('/api/taxis?limit=4').send()
        expect(response.body.data).toHaveLength(4)
    })
})

describe('POST /taxis', () => {
    test('It should respond with a status code 201', async () => {
        const response = await testApp.post('/api/taxis').send({
            id: 12345,
            plate: '123-ABCD',
        })
        expect(response.status).toBe(201)
        expect(response.body.data.id).toBe(12345)
        expect(response.body.data.plate).toBe('123-ABCD')
    })

    test('It should respond with a status code 400', async () => {
        const response = await testApp.post('/api/taxis').send({
            id: 12345,
        })
        expect(response.status).toBe(400)
        expect(response.body.message).toBe(
            'You have not provided a valid plate for the taxi. Please check it out trying to register a new Taxi',
        )
    })
})

describe('GET /taxis/taxiId', () => {
    test('It should respond with a status code 200', async () => {
        const taxiId = 12345
        const response = await testApp.get(`/api/taxis/${taxiId}`).send()
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBe(taxiId)
        expect(response.body.data.plate).toBe('123-ABCD')
    })

    test('It should respond with a status code 404 when taxi id isn`t found', async () => {
        const response = await testApp.get('/api/taxis/3').send()
        expect(response.body.message).toBe('The taxi id you are looking for does not exist.')
        expect(response.status).toBe(404)
    })
})

describe('PATCH /taxis', () => {
    test('It should respond with a status code 200 when update a register', async () => {
        const response = await testApp.patch('/api/taxis/12345').send({
            id: 123456,
            plate: '123-ABCD',
        })
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBe(123456)
    })
})

describe('DELETE /taxis', () => {
    test('It should respond with a status code 200 when delete a register', async () => {
        const response = await testApp.delete('/api/taxis/123456').send()
        expect(response.status).toBe(200)
        expect(response.body.message).toBe('Data deleted successfully')
    })
})
