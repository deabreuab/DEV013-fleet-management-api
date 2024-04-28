import { check } from 'express-validator'

const getTrajectoriesValidator = [
    check('page').optional().isInt().withMessage('The page parameter must be an integer'),
    check('limit').optional().isInt().withMessage('The limit parameter must be an integer'),
    check('taxiId').optional().isInt().withMessage('The taxiId parameter must be an integer'),
    check('date').optional().isString().withMessage('The date parameter must be a string'),
]

const createTrajectoryValidator = [
    check('id')
        .exists()
        .withMessage('id field is missing, please verify your request.')
        .isInt()
        .withMessage('The id field must be an integer'),
    check('latitude')
        .exists()
        .withMessage('latitude field is missing, please verify your request.')
        .isFloat()
        .withMessage('The latitude field must be a float'),
    check('longitude')
        .exists()
        .withMessage('longitude field is missing, please verify your request.')
        .isFloat()
        .withMessage('The longitude field must be a float'),
]

const deleteTrajectoryValidator = [
    check('trajectoryId')
        .isEmpty()
        .withMessage('The trajectory id parameter is missing, please verify your request.')
]

export { createTrajectoryValidator, getTrajectoriesValidator, deleteTrajectoryValidator }
