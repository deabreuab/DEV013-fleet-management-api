import type { RequestHandler } from 'express' // En Express, RequestHandler es un tipo de dato que describe una función que puede manejar una solicitud HTTP. Ya maneja tipo Request, Response y devuelve 'void'
import {
    createNewTaxi,
    getAllTaxis,
    getATaxi,
    updateTaxi,
    deleteATaxi,
} from '../services/taxis'
import type { ITaxi, IPaginated } from '../models/taxisModel'

const registerTaxi: RequestHandler = async (req, res) => {
    /*
    #swagger.tags = ['taxis']
    #swagger.summary = 'Register new taxi'
    #swagger.description = 'Add new taxi to Database'
    #swagger.requestBody = { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/createTaxi" } } } }
    #swagger.responses[200] = { description: 'Successful operation', schema: { message: 'Successful operation', data: { $ref: "#/components/schemas/createTaxi" } } }
    */

    try {
        const { id, plate }: ITaxi = req.body
        if (!id) {
            return res.status(400).json({
                message:
                    'You have not provided a valid ID for the taxi. Please check it out trying to register a new Taxi',
            })
        }
        if (!plate) {
            return res.status(400).json({
                message:
                    'You have not provided a valid plate for the taxi. Please check it out trying to register a new Taxi',
            })
        }
        // Validar si el taxi ya existe ID o plate antes de intentar registrar un nuevo registro
        const result = await createNewTaxi(id, plate)
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
        const { page = 1, limit = 10 }: IPaginated = req.query
        // Agregó valor por default a page y a limit si no se envia nada
        const skipResults = page - 1 * limit
        const result = await getAllTaxis(skipResults, limit)
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
        const { taxiId }: { taxiId?: number } = req.params
        if (!taxiId) {
            return res.status(400).json({
                message: 'Invalid Id, please enter a valid one',
            })
        }
        const result = await getATaxi(taxiId)
        if (!result) {
            return res.status(404).json({
                message: 'The taxi id you are looking for does not exist.',
            })
        }
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
        const { taxiId = 0 }: { taxiId?: number } = req.params
        const { id, plate }: ITaxi = req.body
        const result = await updateTaxi(taxiId, plate, id)
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
        const result = await deleteATaxi(+taxiId)
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
