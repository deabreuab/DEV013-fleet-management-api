import express from 'express'
import { createTrajectory, deleteTrajectory, getTrajectoriesFilter } from '../controllers/trajectoriesController'
const router = express.Router()

router.post('/', createTrajectory)

router.get('/', getTrajectoriesFilter)

router.delete('/:trajectoryId', deleteTrajectory)

export default router
