import { Router, Request, Response } from "express";
import { blogsRepository } from "../repositories/blogs-repository";
import { validationCreateOrUpdateBlog } from "../validations/validations-blogs";
import { autorizationMiddleware } from "../middlewares/authorization-middleware";


export const blogsRouter = Router({})

blogsRouter.get('/', (req: Request, res: Response)=>{
    const blogs = blogsRepository.findBlogs()
    res.status(200).send(blogs)
})

blogsRouter.get('/:id', (req: Request, res: Response)=>{
    const blog = blogsRepository.findBlogsById(req.params.id)
    
    if(blog){
        res.status(200).send(blog)
    }else{
        res.sendStatus(404)
    }
})

blogsRouter.post('/',
autorizationMiddleware, 
validationCreateOrUpdateBlog,
(req: Request, res: Response)=>{
    const cretatedBlog = blogsRepository.createBlog(req.body.name, req.body.description, req.body.websiteUrl)
    res.status(201).send(cretatedBlog)
})

blogsRouter.put('/:id',
autorizationMiddleware, 
validationCreateOrUpdateBlog,
(req: Request, res: Response)=>{
    const isUpdate = blogsRepository.updateBlog(req.params.id, req.body.name, req.body.description, req.body.websiteUrl)
    
    if(isUpdate){
        res.sendStatus(204)
    }else{
        res.sendStatus(404)
    }
})

blogsRouter.delete('/:id', 
autorizationMiddleware,
(req: Request, res: Response)=>{
    const isDelete = blogsRepository.deleteBlog(req.params.id)
    
    if(isDelete){
        res.sendStatus(204)
    }else{
        res.sendStatus(404)
    }
})