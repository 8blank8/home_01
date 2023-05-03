import { Router, Request, Response } from "express";
import { videoRepository } from "../repositories/videos-repository";
import { postsRepository } from "../repositories/posts-repository";
import { blogsRepository } from "../repositories/blogs-repository";

export const testingVideoRouter = Router({})

testingVideoRouter.delete('/', (req: Request, res: Response) => {
    videoRepository.deleteVideos()
    postsRepository.deleteAllPosts()
    blogsRepository.deleteAllBlogs()
     
    res.sendStatus(204)
     
 })