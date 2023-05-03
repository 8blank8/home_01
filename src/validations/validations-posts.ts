import { inputValidationMiddleware } from "../middlewares/input-validation-middleware";
import { body } from "express-validator";

export const validationCreateOrUpdatePost = [
    body('title').notEmpty().withMessage('title is required'),
    body('title').isString().isLength({min: 1, max: 30}).withMessage('title length min 1 max 30'),
    body('shortDescription').notEmpty().withMessage('shortDescription is required'),
    body('shortDescription').isString().isLength({min: 1, max: 100}).withMessage('shortDescription length min 1 max 100'),
    body('content').notEmpty().withMessage('content is required'),
    body('content').isString().isLength({min: 1, max: 1000}).withMessage('content length min 1 max 1000'),
    body('blogId').notEmpty().withMessage('blogId is required'),
    body('blogId').isString().withMessage('blogId must be string'),
    inputValidationMiddleware
]

