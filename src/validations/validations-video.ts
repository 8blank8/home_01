import { body } from "express-validator"
import { inputValidationMiddleware } from "../middlewares/input-validation-middleware"


export const validationCreateVideo = [
    body('title').trim().isLength({min: 1, max: 40}).withMessage('title length min 1 max 40'),
    body('author').trim().isLength({min: 1, max: 20}).withMessage('author length min 1 max 20'),
    body('availableResolutions').isArray().isIn(["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"]).withMessage('availableResolutions has been value ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"]'),
    inputValidationMiddleware
]

export const validationUpdateVideo = [
    body('title').trim().isLength({min: 1, max: 40}).withMessage('title length min 1 max 40'),
    body('author').trim().isLength({min: 1, max: 20}).withMessage('author length min 1 max 20'),
    body('availableResolutions').isArray().isIn(["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"]).withMessage('availableResolutions has been value ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"]'),
    body('canBeDownloaded').isIn([true, false]).withMessage('canBeDownloaded has been value true or false'),
    body('minAgeRestriction').custom(item => item === null || item > 1 && item < 19).withMessage('minAgeRestriction has been value nul or 1 - 18'),
    body('publicationDate').isString().withMessage('publicationDate has been type string'),
    inputValidationMiddleware
]
