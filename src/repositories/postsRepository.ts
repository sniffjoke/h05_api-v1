import {PostDBType} from "../types/db.interface";
import {postCollection} from "../db/mongo-db";
import {DeleteResult, ObjectId, UpdateResult} from "mongodb";
import {PostDBTypeResponse} from "../types/db.response.interface";


export const postsRepository = {

    async getAllPosts(query: any) {
        // const posts = await postCollection.find().toArray()
        // return posts.map((post: any) => this.postMapForRender(post))
        const posts = await postCollection
            .find()
            .sort(query.sortBy, query.sortDirection)
            .limit(query.pageSize)
            .skip((query.page - 1) * query.pageSize)
            .toArray()
        return {
            ...query,
            items: posts.map((post: any) => this.postMapForRender(post))
        }
    },

    async create(newPost: PostDBType): Promise<any> {
        const post = {
            ...newPost,
            blogId: newPost.blogId,
            createdAt: new Date(Date.now()).toISOString()
        }
        await postCollection.insertOne(post)
        return post
    },

    async findPostById(postId: ObjectId) {
        return await postCollection.findOne({_id: postId})
    },

    async updatePostById(postId: ObjectId, post: PostDBType): Promise<UpdateResult> {
        const findedPost = await this.findPostById(postId)
        const updates = {
            $set: {
                title: post.title,
                shortDescription: post.shortDescription,
                content: post.content,
            }
        }
        const updatedPost = await postCollection.updateOne({_id: findedPost?._id}, updates)
        return updatedPost
    },

    async renderPost(postId: ObjectId) {
        const post = await this.findPostById(postId)
        return this.postMapForRender(post as any)
    },

    postMapForRender(post: PostDBTypeResponse) {
        const {createdAt, blogName, title, shortDescription, content, _id, blogId} = post
        return {
            id: _id,
            title,
            shortDescription,
            content,
            blogId,
            blogName,
            createdAt
        }
    },

    async postDelete(postId: ObjectId): Promise<DeleteResult> {
        return await postCollection.deleteOne({_id: postId})
    },

    async findPostsByBlogId(blogId: string, query: any) {
        // const posts = await postCollection.find({blogId}).toArray()
        // return posts.map((post: any) => this.postMapForRender(post))
        const posts = await postCollection
            .find({blogId})
            .sort(query.sortBy, query.sortDirection)
            .limit(query.pageSize)
            .skip((query.page - 1) * query.pageSize)
            .toArray()
        return {
            ...query,
            items: posts.map((post: any) => this.postMapForRender(post))
        }
    }

}
