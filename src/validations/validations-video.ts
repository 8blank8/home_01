import { body } from "express-validator"
import { inputValidationMiddleware } from "../middlewares/input-validation-middleware"


export const validationCreateVideo = [
    body('title').trim().notEmpty().isLength({min: 1, max: 40}),
    body('author').trim().notEmpty().isLength({min: 1, max: 20}),
    body('availableResolutions').notEmpty().isArray().isIn(["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"]),
    inputValidationMiddleware
]

export const validationUpdateVideo = [
    body('title').trim().notEmpty().isLength({min: 1, max: 40}),
    body('author').trim().notEmpty().isLength({min: 1, max: 20}),
    body('availableResolutions').notEmpty().isArray().isIn(["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"]),
    body('canBeDownloaded').notEmpty().isIn([true, false]),
    body('minAgeRestriction').custom(item => item === null || item > 1 && item < 19),
    body('publicationDate').notEmpty().isString(),
    inputValidationMiddleware
]
