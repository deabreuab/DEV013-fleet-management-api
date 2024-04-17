import type { RequestHandler } from 'express'
import prisma from '../config/connect'

const createTrajectory: RequestHandler = async (req, res) => {
    try {
        const { id, latitude, longitude } = req.body
        if (!id) {
            return res.status(400).json({
                message: 'An invalid or non-existent taxi ID has been submitted, please verify your request.'
            })
        }
        const taxi = await prisma.taxis.findUnique({
            where: {
                id
            }
        })
        if (!taxi) {
            return res.status(400).json({
                message: 'No taxi with this ID has been found, please check again the submitted data.'
            })
        }
        const result = await prisma.trajectories.create({
            data: {
                taxi_id: taxi.id,
                latitude,
                longitude,
                date: new Date()
            }
        })
        res.status(201).json({
            message: 'Successful operation',
            data: result,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send()
    }
}

const getTrajectories: RequestHandler = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query
        const skipResults = (+page - 1) * Number(limit)
        const result = await prisma.trajectories.findMany({
            skip: skipResults,
            take: (+limit > 0) ? +limit : undefined
        })
        res.json({
            data: result,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send()
    }
}

const getTrajectoriesByTaxiId: RequestHandler = async (req, res) => {
    try {
        const { taxiId } = req.params
        const { page = 1, limit = 10 } = req.query
        const skipResults = (+page - 1) * Number(limit)
        const taxi = await prisma.taxis.findUnique({
            where: {
                id: +taxiId
            }
        })
        if (!taxi) {
            return res.status(400).json({
                message: 'No taxi with this ID has been found, please check again the submitted data.'
            })
        }
        const result = await prisma.trajectories.findMany({
            where: {
                taxi_id: taxi.id
            },
            skip: skipResults,
            take: (+limit > 0) ? +limit : undefined
        })
        res.json({
            data: result,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send()
    }
}

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

// const modifyTrajectory: RequestHandler = async (req, res) => {
//     try {
//         const { taxiId } = req.params
//         const {  } = req.body
//         const result = await prisma.trajectories.update({
//             where: {
//                 id:
//             },
//             data: {
//             }
//         })
//         res.json({
//             message: 'Changes made successfully',
//             data: result,
//         })
//     } catch (error) {
//         console.log(error)
//         res.status(500).send()
//     }
// }

const deleteTrajectory: RequestHandler = async (req, res) => {
    try {
        const { trajectoryId } = req.params
        const result = await prisma.trajectories.delete({
            where: {
                id: +trajectoryId
            }
        })
        res.json({
            message: 'Data deleted successfully',
            data: result,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send()
    }
}

export { createTrajectory, getTrajectories, getTrajectoriesByTaxiId, getLocationByDate, /* modifyTrajectory */ deleteTrajectory }
