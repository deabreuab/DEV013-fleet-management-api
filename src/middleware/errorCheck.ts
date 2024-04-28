import type { RequestHandler } from 'express'
import { validationResult } from 'express-validator'

const validate: RequestHandler = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: errors.array()[0].msg,
        })
    }
    next()
}

export { validate }
