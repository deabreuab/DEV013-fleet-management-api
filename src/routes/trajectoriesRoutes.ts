import express from 'express'
import { getLocationByDate } from '../controllers/trajectoriesController'
const router = express.Router()

router.get('/:taxiId/:date', getLocationByDate)

export default router
