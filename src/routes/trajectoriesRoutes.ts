import express from 'express'
import {
    createTrajectory,
    deleteTrajectory,
    getTrajectoriesFilter,
    lastTrajectory,
    getTrajectoriesExcel,
} from '../controllers/trajectoriesController'
import {
    createTrajectoryValidator,
    deleteTrajectoryValidator,
    getLastestTrajectoriesValidator,
    getTrajectoriesValidator,
} from '../validators/trajectoriesValidator'
import { validate } from '../middleware/errorCheck'
const router = express.Router()

router.post('/', createTrajectoryValidator, validate, createTrajectory)

router.get('/', getTrajectoriesValidator, validate, getTrajectoriesFilter)

router.get('/lastest', getLastestTrajectoriesValidator, validate, lastTrajectory)

router.get('/report', getTrajectoriesExcel)

router.delete('/:trajectoryId', deleteTrajectoryValidator, validate, deleteTrajectory)

export default router
