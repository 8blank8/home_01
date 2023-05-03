import { BlogsType } from "../models/BlogsModel";

const blogs: BlogsType[] = [{
    id: 'string',
    name: 'Vladimir',
    description: 'asdmklasmlg alsfalfgnsla asklmfalskm',
    websiteUrl: 'http://site.com'
}]

export const blogsRepository = {
    findBlogs(){
        return blogs
    },

    findBlogsById(id: string){
        const blog = blogs.find(item => item.id === id)
        return blog
    },

    createBlog(name: string, description: string, websiteUrl: string){
        const createdBlog: BlogsType = {
            id: String(+(new Date())),
            name: name,
            description: description,
            websiteUrl: websiteUrl
        }

        blogs.push(createdBlog)

        return createdBlog
    },

    updateBlog(id: string, name: string, description: string, websiteUrl: string){
        const blog = blogs.find(item => item.id === id)

        if(blog){
            blog.name = name
            blog.description = description
            blog.websiteUrl = websiteUrl
            return true
        }else{
            return false
        }
    },

    deleteBlog(id: string){
        const blog = blogs.find(item => item.id === id)

        if(blog){
            blogs.splice(blogs.indexOf(blog), 1)
            return true
        }else{
            return false
        }
    },

    deleteAllBlogs(){
        blogs.length = 0
        return true
    }
}