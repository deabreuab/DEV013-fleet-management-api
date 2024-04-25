import prisma from '../config/connect'
import type { ITrajectory } from '../models/trajectoriesModel'

const createNewTrajectory = async (id: number, latitude: number, longitude: number): Promise<ITrajectory> => {
    return await prisma.trajectories.create({
        data: {
            taxi_id: id,
            latitude,
            longitude,
            date: new Date(),
        },
    })
}

const getAllTrajectories = async (skipResults: number, limit: number, taxiId: number | undefined, date: string | undefined): Promise<ITrajectory[]> => {
    return await prisma.trajectories.findMany({
        select: {
            id: true,
            latitude: true,
            longitude: true,
            date: true,
            taxi_id: true,
        },
        where: {
            taxi_id: taxiId ? +taxiId : undefined,
            date: !(date && typeof date === 'string' && date.trim() !== '')
                ? undefined
                : {
                    gte: new Date(`${date}T00:00:00`), // Mayor o igual que 'fecha 00:00:00'
                    lte: new Date(`${date}T23:59:59`), // Menor o igual que 'fecha 23:59:59'
                },
        },
        skip: skipResults,
        take: +limit > 0 ? +limit : undefined,
    })
}

export { createNewTrajectory, getAllTrajectories }
