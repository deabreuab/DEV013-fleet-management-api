/* eslint-disable @typescript-eslint/indent */
import type { RequestHandler } from 'express'
import prisma from '../config/connect'

const createTrajectory: RequestHandler = async (req, res) => {
    /*
    #swagger.tags = ['trajectories']
    #swagger.summary = 'Register new trajectory'
    #swagger.description = 'Add new trajectory to Database'
    #swagger.requestBody = { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/trajectory" } } } }
    #swagger.responses[200] = { description: 'Successful operation', schema: { message: 'Successful operation', data: { $ref: "#/components/schemas/trajectoryResult" } } }
    */
    try {
        const { id, latitude, longitude } = req.body
        if (!id) {
            return res.status(400).json({
                message: 'An invalid or non-existent taxi ID has been submitted, please verify your request.',
            })
        }
        const taxi = await prisma.taxis.findUnique({
            where: {
                id,
            },
        })
        if (!taxi) {
            return res.status(400).json({
                message: 'No taxi with this ID has been found, please check again the submitted data.',
            })
        }
        const result = await prisma.trajectories.create({
            data: {
                taxi_id: taxi.id,
                latitude,
                longitude,
                date: new Date(),
            },
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

const getTrajectoriesFilter: RequestHandler = async (req, res) => {
    /*
    #swagger.tags = ['trajectories']
    #swagger.summary = 'Get trajectories'
    #swagger.description = 'Get trajectories with filters from database'
    */
    try {
        const { page = 1, limit = 10, taxiId, date } = req.query
        const skipResults = (+page - 1) * Number(limit)
        const result = await prisma.trajectories.findMany({
            select: {
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
        res.json({
            data: result,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send()
    }
}

const deleteTrajectory: RequestHandler = async (req, res) => {
    /*
    #swagger.tags = ['trajectories']
    #swagger.summary = 'Delete trajectory'
    #swagger.description = 'Delete trajectory from database'
    #swagger.requestBody = { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/trajectory" } } } }
    #swagger.responses[200] = { description: 'Successful operation', schema: { message: 'Data deleted successfully', data: { $ref: "#/components/schemas/trajectory" } } }
    */
    try {
        const { trajectoryId } = req.params
        const result = await prisma.trajectories.delete({
            where: {
                id: +trajectoryId,
            },
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

export { createTrajectory, deleteTrajectory, getTrajectoriesFilter }
