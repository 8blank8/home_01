import { NextFunction, Request, Response } from "express"
import { validationResult } from "express-validator"


export const inputValidationMiddleware = (req: Request, res: Response, next: NextFunction)=>{

    const errors = validationResult(req)
    if(!errors.isEmpty()){
      const err = errors.array({onlyFirstError: true}).map(item => ({message: item.msg, field: item.path}))
       res.status(400).send({errorsMessages:  err})
    }else{
       next()
    }
}

