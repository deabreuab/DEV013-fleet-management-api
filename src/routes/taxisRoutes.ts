import express from 'express'
import {
    registerTaxi,
    getTaxis,
    getTaxiById,
    modifyTaxi,
    deleteTaxi,
} from '../controllers/taxisController'

const router = express.Router()

router.post('/', registerTaxi)

router.get('/', getTaxis)

router.get('/:taxiId', getTaxiById)

router.patch('/:taxiId', modifyTaxi)

router.delete('/:taxiId', deleteTaxi)

export default router
