import { Router, Request, Response } from "express";
import { postsRepository } from "../repositories/posts-repository";
import { validationCreateOrUpdatePost } from "../validations/validations-posts";
import { autorizationMiddleware } from "../middlewares/authorization-middleware"



export const postsRouter = Router({})

postsRouter.get('/', (req: Request, res: Response)=>{
    const posts = postsRepository.findPosts()
    res.status(200).send(posts)
})

postsRouter.get('/:id', (req: Request, res: Response)=>{
    const post = postsRepository.findPostById(req.params.id)

    if(post){
        res.status(200).send(post)
    }else{
        res.sendStatus(404)
    }
})

postsRouter.post('/', 
autorizationMiddleware,
validationCreateOrUpdatePost,
(req: Request, res: Response)=>{
    const createdPost = postsRepository.createPost(
        req.body.title, 
        req.body.shortDescription,
        req.body.content,
        req.body.blogId,
    )

    res.status(201).send(createdPost)
})

postsRouter.put('/:id', 
autorizationMiddleware,
validationCreateOrUpdatePost,
(req: Request, res: Response)=>{
    const isUpadate = postsRepository.updatePost(
        req.params.id, 
        req.body.title,
        req.body.shortDescription,
        req.body.content, 
        req.body.blogId
    )

    if(isUpadate){
        res.sendStatus(204)
    }else{
        res.sendStatus(404)
    }
})

postsRouter.delete('/:id', 
autorizationMiddleware,
(req: Request, res: Response)=>{
    const isDelete = postsRepository.deletePost(req.params.id)

    if(isDelete){
        res.sendStatus(204)
    }else{
        res.sendStatus(404)
    }
})