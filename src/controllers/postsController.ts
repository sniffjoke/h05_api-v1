import {Request, Response} from 'express';
import {ObjectId} from "mongodb";
import {postsRepository} from "../repositories/postsRepository";
import {queryHelper} from "../helpers/helpers";
import {blogsQueryRepository} from "../queryRepositories/blogsQueryRepository";
import {postsQueryRepository} from "../queryRepositories/postsQueryRepository";


export const getController = async (req: Request<any, any, any, any>, res: Response) => {
    try {
        const query = await queryHelper(req.query, 'posts')
        const posts = await postsRepository.getAllPosts(query)
        const {
            pageSize,
            pagesCount,
            totalCount,
            page,
            items
        } = posts
        res.status(200).json({
            pageSize,
            pagesCount,
            totalCount,
            page,
            items
        })
    } catch (e) {
        res.status(500).send(e)
    }
}

export const getControllerById = async (req: Request, res: Response) => {
    try {
        const postId = new ObjectId(req.params.id)
        const post = await postsQueryRepository.postOutput(postId)
        res.status(200).json(post)
    } catch (e) {
        res.status(500).send(e)
    }
}

export const createPostController = async (req: Request, res: Response) => {
    try {
        const blog = await blogsQueryRepository.findBlogById(new ObjectId(req.body.blogId))
        const newPost = await postsRepository.createPost({...req.body, blogName: blog?.name})
        const newPostMap = postsQueryRepository.postMapOutput(newPost)
        res.status(201).json(newPostMap)
    } catch (e) {
        res.status(500).send(e)
    }
}

export const updatePostController = async (req: Request, res: Response) => {
    try {
        const postId = new ObjectId(req.params.id)
        await postsRepository.updatePostById(postId, req.body)
        res.status(204).send('Обновлено')
    } catch (e) {
        res.status(500).send(e)
    }
}

export const deleteController = async (req: Request, res: Response) => {
    try {
        const postId = new ObjectId(req.params.id)
        await postsRepository.postDelete(postId)
        res.status(204).send('Удалено');
    } catch (e) {
        res.status(500).send(e)
    }
}

export const getAllPostsByBlogId = async (req: Request<any, any, any, any>, res: Response) => {
    try {
        const query = await queryHelper(req.query, 'posts', req.params.id)
        const posts = await postsRepository.findAllPostsByBlogId(req.params.id, query)
        const {
            pageSize,
            pagesCount,
            totalCount,
            page,
            items
        } = posts
        res.status(200).json({
            pageSize,
            pagesCount,
            totalCount,
            page,
            items
        })
    } catch (e) {
        res.status(500).send(e)
    }
}

export const createPostByBlogIdWithParams = async (req: Request, res: Response) => {
    try {
        const blog = await blogsQueryRepository.findBlogById(new ObjectId(req.params.id))
        const newPost = await postsRepository.createPost({...req.body, blogName: blog?.name, blogId: req.params.id})
        const newPostMap = postsQueryRepository.postMapOutput(newPost)
        res.status(201).json(newPostMap)
    } catch (e) {
        res.status(500).send(e)
    }
}

