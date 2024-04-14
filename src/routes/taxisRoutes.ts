import express from 'express'
import { getTaxis } from '../controllers/taxisController'

const router = express.Router()

router.get('/', getTaxis)

export default router
