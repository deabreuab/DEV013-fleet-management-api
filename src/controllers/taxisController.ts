import type { RequestHandler } from 'express' // En Express, RequestHandler es un tipo de dato que describe una función que puede manejar una solicitud HTTP. Ya maneja tipo Request, Response y devuelve 'void'
import prisma from '../config/connect'

const registerTaxi: RequestHandler = async (req, res) => {
    /*
    #swagger.tags = ['taxis']
    #swagger.summary = 'Register new taxi'
    #swagger.description = 'Add new taxi to Database'
    #swagger.requestBody = { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/createTaxi" } } } }
    #swagger.responses[200] = { description: 'Successful operation', schema: { message: 'Successful operation', data: { $ref: "#/components/schemas/createTaxi" } } }
    */

    try {
        const { id, plate } = req.body
        const result = await prisma.taxis.create({
            data: {
                id,
                plate,
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

const getTaxis: RequestHandler = async (req, res) => {
    /*
    #swagger.tags = ['taxis']
    #swagger.summary = 'Get all taxis'
    #swagger.description = 'Get all taxis'
    */
    try {
        const { page = 1, limit = 10 } = req.query
        // Agregó valor por default a page y a limit si no se envia nada
        const skipResults = (+page - 1) * Number(limit)
        const result = await prisma.taxis.findMany({
            // Manera para hacer la paginación Prisma
            skip: skipResults,
            // Si el limit es 0 el take será undefined para que Prisma devuelva todos los registros de taxis
            take: +limit > 0 ? +limit : undefined,
        })

        // #swagger.responses[200] = { description: 'Successful operation', schema: { message: 'Successful operation', data: [{ $ref: "#/components/schemas/createTaxi" }] } }
        res.json({
            data: result,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send()
    }
}

const getTaxiById: RequestHandler = async (req, res) => {
    /*
    #swagger.tags = ['taxis']
    #swagger.summary = 'Get taxi by id'
    #swagger.description = 'Get taxi by primary id'
    #swagger.responses[200] = { description: 'Successful operation', schema: { message: 'Successful operation', data: { $ref: "#/components/schemas/getTaxi" } } }
    */
    try {
        const { taxiId } = req.params
        if (!taxiId) {
            return res.status(400).json({
                message: 'Invalid Id, please enter a valid one',
            })
        }
        const result = await prisma.taxis.findUnique({
            where: {
                id: +taxiId,
            },
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
    /*
    #swagger.tags = ['taxis']
    #swagger.summary = 'Mofiy taxi'
    #swagger.description = 'Modify taxi's information'
    #swagger.requestBody = { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/createTaxi" } } } }
    #swagger.responses[200] = { description: 'Successful operation', schema: { message: 'Successful operation', data: { $ref: "#/components/schemas/getTaxi" } } }
    #swagger.responses[500] = { description: 'Internal Server Error' }
    */
    try {
        const { taxiId } = req.params
        const { id, plate } = req.body
        const result = await prisma.taxis.update({
            where: {
                id: +taxiId,
            },
            data: {
                id,
                plate,
            },
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
    /*
    #swagger.tags = ['taxis']
    #swagger.summary = 'Delete taxi'
    #swagger.description = 'Delete taxi from database'
    #swagger.requestBody = { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/createTaxi" } } } }
    #swagger.responses[200] = { description: 'Successful operation', schema: { message: 'Data deleted successfully', data: { $ref: "#/components/schemas/getTaxi" } } }
    */
    try {
        const { taxiId } = req.params
        const result = await prisma.taxis.delete({
            where: {
                id: +taxiId,
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

export { registerTaxi, getTaxis, getTaxiById, modifyTaxi, deleteTaxi }
