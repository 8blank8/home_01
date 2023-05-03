import { NextFunction, Request, Response } from "express"
import { validationResult, body } from "express-validator"


export const inputValidationMiddleware = (req: Request, res: Response, next: NextFunction)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
      
      const err = errors.array().map(item => ({message: item.msg, field: item.path}))
       res.status(400).send({errors:  err})
    }else{
       next()
    }
}

