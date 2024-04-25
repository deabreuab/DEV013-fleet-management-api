import express from 'express'
import { createTrajectory, deleteTrajectory, getTrajectoriesFilter, lastTrajectory } from '../controllers/trajectoriesController'
const router = express.Router()

router.post('/', createTrajectory)

router.get('/', getTrajectoriesFilter)

router.get('/lastest', lastTrajectory)

router.delete('/:trajectoryId', deleteTrajectory)

export default router
