import express from 'express'
import taxis from './taxisRoutes'
import trajectories from './trajectoriesRoutes'

const router = express.Router()

router.use('/taxis', taxis)
router.use('/trajectories', trajectories)

export default router
