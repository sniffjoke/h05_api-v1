import {Request, Response} from 'express';
import {ObjectId} from "mongodb";
import {blogsRepository} from "../repositories/blogsRepository";
import {queryHelper} from "../helpers/helpers";
import {blogsQueryRepository} from "../queryRepositories/blogsQueryRepository";
import {Blog} from "../types/blogs.interface";


export const getBlogsController = async (req: Request<any, any, any, any>, res: Response) => {
    const query = await queryHelper(req.query, 'blogs')
    const blogs = await blogsRepository.getAllBlogs(query)
    const {
        pageSize,
        pagesCount,
        totalCount,
        page,
        items
    } = blogs
    res.status(200).json({
        pageSize,
        pagesCount,
        totalCount,
        page,
        items
    })
}

export const getBlogByIdController = async (req: Request, res: Response) => {
    const id = new ObjectId(req.params.id)
    const blog = await blogsQueryRepository.blogOutput(id)
    res.status(200).json(blog)
}

export const createBlogController = async (req: Request, res: Response) => {
    try {
        const newBlog = await blogsRepository.createBlog(req.body)
        const newBlogMap = blogsQueryRepository.blogMapOutput(newBlog as Blog)
        res.status(201).json(newBlogMap)
    } catch (e) {
        res.status(500).send(e)
    }
}

export const updateBlogController = async (req: Request, res: Response) => {
    try {
        const blogId = new ObjectId(req.params.id)
        await blogsRepository.updateBlogById(blogId, req.body)
        res.status(204).send('Обновлено')
    } catch (e) {
        res.status(500).send(e)
    }
}

export const deleteBlogController = async (req: Request, res: Response) => {
    try {
        const blogId = new ObjectId(req.params.id)
        await blogsRepository.deleteBlog(blogId)
        res.status(204).send('Удалено');
    } catch (e) {
        res.status(500).send(e)
    }

}

