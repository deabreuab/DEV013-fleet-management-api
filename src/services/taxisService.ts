import prisma from '../config/connect'
import type { ITaxi } from '../interfaces/taxisInterface'

const createNewTaxi = async (id: number, plate: string): Promise<ITaxi> => {
    return await prisma.taxis.create({
        data: {
            id,
            plate,
        },
    })
}

const getAllTaxis = async (skipResults: number | undefined, limit: number): Promise<ITaxi[]> => {
    return await prisma.taxis.findMany({
        // Manera para hacer la paginación Prisma
        skip: skipResults,
        // Si el limit es 0 el take será undefined para que Prisma devuelva todos los registros de taxis
        take: +limit > 0 ? +limit : undefined,
    })
}

const getATaxi = async (taxiId: number): Promise<ITaxi | null> => {
    return await prisma.taxis.findUnique({
        where: {
            id: +taxiId,
        },
    })
}

const updateTaxi = async (taxiId: number, plate: string, id: number): Promise<ITaxi> => {
    return await prisma.taxis.update({
        where: {
            id: taxiId,
        },
        data: {
            id,
            plate,
        },
    })
}

const deleteATaxi = async (taxiId: number): Promise<ITaxi> => {
    return await prisma.taxis.delete({
        where: {
            id: +taxiId,
        },
    })
}

export { createNewTaxi, getAllTaxis, getATaxi, updateTaxi, deleteATaxi }
