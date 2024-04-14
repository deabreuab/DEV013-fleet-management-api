import type { RequestHandler } from 'express'
import prisma from '../config/connect'

const getLocationByDate: RequestHandler = async (req, res) => {
    try {
        console.log(req.params)
        const { taxiId, date } = req.params
        const { page = 1, limit = 10 } = req.query
        const skipResults = (+page - 1) * +limit
        // SELECT latitude, longitude, date FROM trajectories WHERE taxi_id = 6418 and date >= '2008-02-02 00:00:00' and date <= '2008-02-02 23:59:59'
        const result = await prisma.trajectories.findMany({
            select: {
                latitude: true,
                longitude: true,
                date: true
            },
            where: {
                taxi_id: +taxiId,
                date: {
                    gte: new Date(`${date}T00:00:00`), // Mayor o igual que 'fecha 00:00:00'
                    lte: new Date(`${date}T23:59:59`) // Menor o igual que 'fecha 23:59:59'
                }
            },
            skip: skipResults,
            take: (+limit > 0) ? +limit : undefined,
        })
        res.json({
            taxi_id: taxiId,
            date,
            data: result
        })
    } catch (error) {
        console.log(error)
        res.status(500).send()
    }
}

export { getLocationByDate }
