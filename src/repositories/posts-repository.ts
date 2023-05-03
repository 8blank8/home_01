import { PostsType } from "../models/PostsModel"
import { blogsRepository } from "./blogs-repository"

const posts: PostsType[] = [{
    id: "string",
    title: "one",
    shortDescription: "fakkajkajsue",
    content: "baskjbfkasbfk",
    blogId: "string",
    blogName: "Vladimir"
}]

export const postsRepository = {
    findPosts(){
        return posts
    },

    findPostById(id: string){
        const post = posts.find(item => item.id == id)
        return post
    },

    createPost(title: string, shortDescription: string, content: string, blogId: string){
        const createdPost: PostsType= {
            id: String(+(new Date())),
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: blogsRepository.findBlogsById(blogId)?.name
        }

        posts.push(createdPost)
        
        return createdPost
    },

    updatePost(id: string, title: string, shortDescription: string, content: string, blogId: string){
        const post = posts.find(item => item.id == id)

        if(post){
            post.title = title
            post.shortDescription = shortDescription
            post.content = content,
            post.blogId = blogId
            return true
        }else{
            return false
        }
    },

    deletePost(id: string){
        const post = posts.find(item => item.id == id)

        if(post){
            posts.splice(posts.indexOf(post), 1)
            return true
        }else{
            return false
        }
    },

    deleteAllPosts(){
        posts.length = 0
        return true
    }
}