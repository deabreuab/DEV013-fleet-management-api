import { ITrajectory } from '../../src/interfaces/trajectoriesInterface'
import {
    createNewTrajectory,
    getAllTrajectories,
    deleteATrajectory,
} from '../../src/services/trajectoriesService'
import mockData from '../fakeDataTrajectories.json'

jest.mock('@prisma/client', () => {
    const mockPrisma = {
        trajectories: {
            findMany: jest.fn().mockResolvedValue([
                {
                    latitude: 116.30508,
                    longitude: 39.96525,
                    date: '2008-02-02T14:22:40.000Z',
                    taxi_id: 6418,
                },
                {
                    latitude: 116.3043,
                    longitude: 39.9622,
                    date: '2008-02-02T14:25:54.000Z',
                    taxi_id: 6418,
                },
                {
                    latitude: 116.32259,
                    longitude: 39.96596,
                    date: '2008-02-02T14:30:55.000Z',
                    taxi_id: 6418,
                },
                {
                    latitude: 116.34547,
                    longitude: 39.96616,
                    date: '2008-02-02T14:32:44.000Z',
                    taxi_id: 6418,
                },
            ]),
            create: jest.fn().mockImplementation(async (data) => {
                const { taxi_id, longitude, latitude, date } = data.data
                return { taxi_id, longitude, latitude, date }
            }),
            delete: jest.fn().mockImplementation(async (data) => {
                const trajectoryId = data.where.id
                const trajectory = mockData.find((item) => item.id === trajectoryId)
                if(!trajectory){
                    return null
                }
                return trajectory
            }),
        },
    }

    return {
        PrismaClient: jest.fn(() => mockPrisma),
    }
})

describe('POST /trajectories', () => {
    it('should register a new trajectory', async () => {
        const id = 1234
        const latitude = 12334.22
        const longitude = 13244.45

        const newTrajectory = await createNewTrajectory(id, latitude, longitude)

        expect(typeof newTrajectory).toBe('object')
        expect(newTrajectory).toHaveProperty('taxi_id')
        expect(typeof newTrajectory.taxi_id).toBe('number')
        expect(typeof newTrajectory.latitude).toBe('number')
        expect(typeof newTrajectory.longitude).toBe('number')
    })
})

describe('GET all /trajectories', () => {
    it('should return all trajectories', async () => {
        const skip = 2
        const take = 4

        const result = await getAllTrajectories(skip, take, undefined, undefined)

        expect(Array.isArray(result)).toBe(true)
        expect(typeof result[1]).toBe('object')
        expect(result[1]).toHaveProperty('taxi_id')
        expect(typeof result[1].taxi_id).toBe('number')
        expect(result).toEqual([
            {
                latitude: 116.30508,
                longitude: 39.96525,
                date: '2008-02-02T14:22:40.000Z',
                taxi_id: 6418,
            },
            {
                latitude: 116.3043,
                longitude: 39.9622,
                date: '2008-02-02T14:25:54.000Z',
                taxi_id: 6418,
            },
            {
                latitude: 116.32259,
                longitude: 39.96596,
                date: '2008-02-02T14:30:55.000Z',
                taxi_id: 6418,
            },
            {
                latitude: 116.34547,
                longitude: 39.96616,
                date: '2008-02-02T14:32:44.000Z',
                taxi_id: 6418,
            },
        ])
    })
})


describe('DELETE /trajectories', () => {
    it('should delete a trajectory', async () => {
        const trajectoryId = 4
        const result = await deleteATrajectory(trajectoryId)
        
        expect(typeof result).toBe('object')
        expect(result).toHaveProperty('taxi_id')
        expect(result).toHaveProperty('latitude')
        expect(result).toHaveProperty('longitude')
        expect(result).toHaveProperty('date')
        expect(typeof result.taxi_id).toBe('number')
        expect(typeof result.latitude).toBe('number')
        expect(typeof result.longitude).toBe('number')
        expect(typeof result.date).toBe('string')
    })

    it('should return null if trajectory Id does not exist', async () => {
        const trajectoryId = 999234556787

        const result = await deleteATrajectory(trajectoryId)
        expect(result).toBeNull()
    })
})
