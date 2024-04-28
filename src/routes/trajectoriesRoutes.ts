import express from 'express'
import { createTrajectory, deleteTrajectory, getTrajectoriesFilter, lastTrajectory } from '../controllers/trajectoriesController'
import { createTrajectoryValidator, getTrajectoriesValidator } from '../validators/trajectoriesValidator'
import { validate } from '../middleware/errorCheck'
const router = express.Router()

router.post('/', createTrajectoryValidator, validate, createTrajectory)

router.get('/', getTrajectoriesValidator, validate, getTrajectoriesFilter)

router.get('/lastest', lastTrajectory)

router.delete('/:trajectoryId', deleteTrajectory)

export default router
