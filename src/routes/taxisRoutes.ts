import express from 'express'
import { registerTaxi, getTaxis, getTaxiById, modifyTaxi, deleteTaxi } from '../controllers/taxisController'
import {
    createNewTaxiValidator,
    getAllTaxisValidator,
    getATaxiValidator,
    modifyTaxiValidator,
    deleteATaxiValidator,
} from '../validators/taxisValidator'
import { validate } from '../middleware/errorCheck'

const router = express.Router()

router.post('/', createNewTaxiValidator, validate, registerTaxi)

router.get('/', getAllTaxisValidator, validate, getTaxis)

router.get('/:taxiId', getATaxiValidator, validate, getTaxiById)

router.patch('/:taxiId', modifyTaxiValidator, validate, modifyTaxi)

router.delete('/:taxiId', deleteATaxiValidator, validate, deleteTaxi)

export default router
