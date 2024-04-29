import { ITaxi } from '../../src/interfaces/taxisInterface'
import { createNewTaxi, deleteATaxi, getATaxi, getAllTaxis, updateTaxi } from '../../src/services/taxisService'
import mockData from '../fakeDataTaxis.json'

jest.mock('@prisma/client', () => {
    const mockPrisma = {
        taxis: {
            findMany: jest.fn().mockResolvedValue([
                { id: 15, plate: 'FNHK-3772' },
                { id: 21, plate: 'NNEL-8793' },
                { id: 56, plate: 'JIMF-2287' },
                { id: 71, plate: 'CLLD-1805' },
                { id: 108, plate: 'LNGK-1108' },
                { id: 165, plate: 'HKNN-8042' },
                { id: 167, plate: 'IIJB-4867' },
                { id: 252, plate: 'LAHG-7611' },
                { id: 280, plate: 'IHIH-1812' },
                { id: 296, plate: 'CGEF-7101' },
            ]),
            create: jest.fn().mockImplementation(async (data) => {
                const { id, plate } = data.data
                return { id, plate }
            }),
            findUnique: jest.fn().mockImplementation(async (id) => {
                const taxiId = id.where.id
                return mockData.find((taxi: ITaxi) => taxi.id === taxiId) || null
            }),
            update: jest.fn().mockImplementation(async (data) => {
                const { id, plate } = data.data
                if (mockData.find((taxi: ITaxi) => taxi.id === id) === undefined) return null
                return { id, plate }
            }),
            delete: jest.fn().mockImplementation(async (object) => {
                const taxiId = object.where.id
                return mockData.find((taxi: ITaxi) => taxi.id === taxiId) || null
            }),
        },
    }

    return {
        PrismaClient: jest.fn(() => mockPrisma),
    }
})

describe('getAllTaxis', () => {
    it('should return all taxis', async () => {
        const skip = 2
        const take = 4

        const result = await getAllTaxis(skip, take)
        expect(Array.isArray(result)).toBe(true)
        expect(typeof result[1]).toBe('object')
        expect(result[1]).toHaveProperty('id')
        expect(typeof result[1].id).toBe('number')
        expect(result).toEqual(mockData)
    })
})

describe('createNewTaxi', () => {
    it('should register a new taxi', async () => {
        const id = 123
        const plate = 'ABCD-1234'

        const newTaxi = await createNewTaxi(id, plate)

        expect(typeof newTaxi).toBe('object')
        expect(newTaxi).toHaveProperty('id')
        expect(typeof newTaxi.id).toBe('number')
        expect(newTaxi).toEqual({ id, plate })
    })
})

describe('getATaxi', () => {
    it('should return all taxis', async () => {
        const taxiId = 296

        const result = await getATaxi(taxiId)
        expect(typeof result).toBe('object')
        expect(result).toHaveProperty('id')
        expect(result).toHaveProperty('plate')
        expect(typeof result?.id).toBe('number')
        expect(typeof result?.plate).toBe('string')
        expect(result).toEqual({ id: 296, plate: 'CGEF-7101' })
    })

    it('should return null if taxi does not exist', async () => {
        const taxiId = 999

        const result = await getATaxi(taxiId)
        expect(result).toBeNull()
    })
})

describe('updateTaxi', () => {
    it('should update a taxi', async () => {
        const taxiId = 296
        const id = 296
        const plate = 'ABCD-1234'

        const updatedTaxi = await updateTaxi(taxiId, plate, id)

        expect(typeof updatedTaxi).toBe('object')
        expect(updatedTaxi).toHaveProperty('id')
        expect(updatedTaxi).toEqual({ id: 296, plate: 'ABCD-1234' })
    })

    it('shouled return null if taxi does not exist', async () => {
        const taxiId = 999
        const id = 123
        const plate = 'ABCD-1234'

        const updatedTaxi = await updateTaxi(taxiId, plate, id)
        expect(updatedTaxi).toBeNull()
    })
})

describe('deleteATaxi', () => {
    it('should delete a taxi', async () => {
        const taxiId = 296

        const deletedTaxi = await deleteATaxi(taxiId)

        expect(typeof deletedTaxi).toBe('object')
        expect(deletedTaxi).toHaveProperty('id')
        expect(deletedTaxi).toEqual({ id: 296, plate: 'CGEF-7101' })
    })

    it('shouled return null if taxi does not exist', async () => {
        const taxiId = 999

        const deletedTaxi = await deleteATaxi(taxiId)
        expect(deletedTaxi).toBeNull()
    })
})
