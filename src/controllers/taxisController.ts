import type { RequestHandler } from 'express' // En Express, RequestHandler es un tipo de dato que describe una función que puede manejar una solicitud HTTP. Ya maneja tipo Request, Response y devuelve 'void'
import prisma from '../config/connect'

const registerTaxi: RequestHandler = async (req, res) => {
    try {
        const { id, plate } = req.body
        const result = await prisma.taxis.create({
            data: {
                id,
                plate
            }
        })
        res.json({
            message: 'Successful operation',
            data: result,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send()
    }
}

const getTaxis: RequestHandler = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query
        // Agregó valor por default a page y a limit si no se envia nada
        const skipResults = (+page - 1) * Number(limit)
        const result = await prisma.taxis.findMany({
            // Manera para hacer la paginación Prisma
            skip: skipResults,
            // Si el limit es 0 el take será undefined para que Prisma devuelva todos los registros de taxis
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

const getTaxiById: RequestHandler = async (req, res) => {
    try {
        const { taxiId } = req.params
        if (!taxiId) {
            return res.status(400).json({
                message: 'Invalid Id, please enter a valid one'
            })
        }
        const result = await prisma.taxis.findUnique({
            where: {
                id: +taxiId
            }
        })
        res.json({
            message: 'Successful operation',
            data: result,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send()
    }
}

const modifyTaxi: RequestHandler = async (req, res) => {
    try {
        const { taxiId } = req.params
        const { id, plate } = req.body
        const result = await prisma.taxis.update({
            where: {
                id: +taxiId
            },
            data: {
                id,
                plate
            }
        })
        res.json({
            message: 'Changes made successfully',
            data: result,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send()
    }
}

const deleteTaxi: RequestHandler = async (req, res) => {
    try {
        const { taxiId } = req.params
        const result = await prisma.taxis.delete({
            where: {
                id: +taxiId
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

export { registerTaxi, getTaxis, getTaxiById, modifyTaxi, deleteTaxi }
