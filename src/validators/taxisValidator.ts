import { check, param } from 'express-validator'

const createNewTaxiValidator = [
    check('id')
    .exists()
    .withMessage('id field is missing, please verify your request.')
    .isInt()
    .withMessage('The id field must be an integer'),
    check('plate')
    .exists()
    .withMessage('plate field is missing, please verify your request.')
    .isString()
    .withMessage('The plate field must be a string'),
]

const getAllTaxisValidator = [
    check('page').optional().isInt().withMessage('The page parameter must be an integer'),
    check('limit').optional().isInt().withMessage('The limit parameter must be an integer'),
]

const getATaxiValidator = [
    param('taxiId').isInt().withMessage('The taxi id must be an integer')
]

const modifyTaxiValidator = [
    param('taxiId').isInt().withMessage('The taxi id must be an integer'),
    check('id')
    .exists()
    .withMessage('id field is missing, please verify your request.')
    .isInt()
    .withMessage('The id field must be an integer'),
    check('plate')
    .exists()
    .withMessage('plate field is missing, please verify your request.')
    .isString()
    .withMessage('The plate field must be a string')
    .trim()
    .notEmpty()
    .withMessage('The plate field must not be empty'),
]

const deleteATaxiValidator = [
    param('taxiId').isInt().withMessage('The taxi id must be an integer')
]

export { createNewTaxiValidator, getAllTaxisValidator, getATaxiValidator, modifyTaxiValidator, deleteATaxiValidator }