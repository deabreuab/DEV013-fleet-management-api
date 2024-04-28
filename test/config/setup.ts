import app from '../../src/index'
import supertest from 'supertest'

export const testApp = supertest(app)
