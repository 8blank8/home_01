import { Router, Request, Response } from "express";
import { videoRepository } from "../repositories/videos-repository";

export const testingRouter = Router({})

testingRouter.delete('/', (req: Request, res: Response) => {
    const isDelete = videoRepository.deleteVideos()
     if(isDelete){
        res.sendStatus(204)
     }
 })