import {Request, Response} from 'express';
import {ObjectId} from "mongodb";
import {postsRepository} from "../repositories/postsRepository";
import {blogsRepository} from "../repositories/blogsRepository";
import {queryHelper} from "../helpers/helpers";


export const getController = async (req: Request<any, any, any, any>, res: Response) => {
    try {
        // const posts = await postsRepository.getAllPosts()
        // res.status(200).json(posts)
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
        const post = await postsRepository.renderPost(postId)
        res.status(200).json(post)
    } catch (e) {
        res.status(500).send(e)
    }
}

export const postController = async (req: Request, res: Response) => {
    try {
        const blog = await blogsRepository.findBlogById(new ObjectId(req.body.blogId))
        const newPost = await postsRepository.create({...req.body, blogName: blog?.name})
        const newPostMap = await postsRepository.postMapForRender(newPost)
        res.status(201).json(newPostMap)
    } catch (e) {
        res.status(500).send(e)
    }
}

export const putController = async (req: Request, res: Response) => {
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

export const getPostsByBlogId = async (req: Request<any, any, any, any>, res: Response) => {
    try {
        // const posts = await postsRepository.findPostsByBlogId(req.params.id)
        // res.status(200).json(posts)
        console.log(req.params.id)
        const query = await queryHelper(req.query, 'posts', req.params.id)
        const posts = await postsRepository.findPostsByBlogId(req.params.id, query)
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

export const postPostByBlogId = async (req: Request, res: Response) => {
    try {
        const blog = await blogsRepository.findBlogById(new ObjectId(req.params.id))
        const newPost = await postsRepository.create({...req.body, blogName: blog?.name, blogId: req.params.id})
        const newPostMap = await postsRepository.postMapForRender(newPost)
        res.status(201).json(newPostMap)
    } catch (e) {
        res.status(500).send(e)
    }
}

