import express from 'express'
import {
    createTrajectory,
    getTrajectories,
    getTrajectoriesByTaxiId,
    getLocationByDate,
    /* modifyTrajectory, */
    deleteTrajectory,
} from '../controllers/trajectoriesController'
const router = express.Router()

router.post('/', createTrajectory)

router.get('/', getTrajectories)

router.get('/:taxiId', getTrajectoriesByTaxiId)

router.get('/:taxiId/:date', getLocationByDate)

// router.put('/:taxiId/:date', modifyTrajectory)

router.delete('/:trajectoryId', deleteTrajectory)

export default router
