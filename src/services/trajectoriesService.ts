/* eslint-disable @typescript-eslint/indent */
import prisma from '../config/connect'
import type { ITrajectory } from '../interfaces/trajectoriesInterface'

const createNewTrajectory = async (id: number, latitude: number, longitude: number): Promise<ITrajectory> => {
    const result = await prisma.trajectories.create({
        data: {
            taxi_id: id,
            latitude,
            longitude,
            date: new Date(),
        },
    })
    // return result 
    return { ...result, id: result.id}
}

const getAllTrajectories = async (
    skipResults: number,
    limit: number,
    taxiId: number | undefined,
    date: string | undefined,
): Promise<ITrajectory[]> => {
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

const getLastTrajectories = async (skipResults: number, limit: number): Promise<ITrajectory[]> => {
    return await prisma.$queryRaw`select t.taxi_id, t."date", t.latitude, t.longitude, tx.plate
        from trajectories as t
        inner join (
            select tj.taxi_id, MAX(tj."date") as max_date
            from trajectories as tj
            group by tj.taxi_id
        ) as t2
        on t.taxi_id = t2.taxi_id and t."date" = t2.max_date
        inner join taxis as tx
        on t.taxi_id = tx.id
        group by t.taxi_id, t."date", t.latitude, t.longitude, tx.plate
        limit ${limit}
        offset ${skipResults};`
}

const deleteATrajectory = async (trajectoryId: number): Promise<ITrajectory> => {
    return await prisma.trajectories.delete({
        where: {
            id: +trajectoryId,
        },
    })
}

export { createNewTrajectory, getAllTrajectories, getLastTrajectories, deleteATrajectory }
