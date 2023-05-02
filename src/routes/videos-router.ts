import { Router, Request, Response } from "express";
import { videoRepository } from "../repositories/videos-repository";
import { validationCreateVideo, validationUpdateVideo } from "../validations/validations-video";


export const videosRouter = Router({})

videosRouter.get('/', (req: Request, res: Response) => {
   const video = videoRepository.findVideo()
    res.status(200).send(video)
 })
 
videosRouter.get('/:id', (req: Request, res: Response) => {
   const video = videoRepository.findVideoById(+req.params.id)
 
    if (video) {
      res.status(200).send(video)
    }else{
      res.sendStatus(404)
    }
 
    
})
 
videosRouter.post('/', 
   validationCreateVideo,
   (req: Request, res: Response) => {
      const video = videoRepository.createVideo(
                                          req.body.title.toString(),
                                          req.body.author.toString(),
                                          req.body.availableResolutions)
      if(video){
         res.status(201).send(video)
      }
})
 
videosRouter.put('/:id', 
   validationUpdateVideo,
   (req: Request, res: Response) => {

    const video = videoRepository.updateVideo(
                                              +req.params.id,
                                              req.body.title.toString(),
                                              req.body.author.toString(),
                                              req.body.availableResolutions, 
                                              req.body.canBeDownloaded,
                                              req.body.minAgeRestriction,
                                              req.body.publicationDate
                                              )
    
    if(video){
       res.sendStatus(204)
    }else{
       res.sendStatus(404)
    }

})
 
videosRouter.delete('/:id', (req: Request, res: Response) => {
    const isDelete = videoRepository.deleteVideoById(+req.params.id)
 
    if (isDelete) {
       res.sendStatus(204)
       return
    }else{
      res.sendStatus(404)
    }
})
 