import {BlogDBType} from "../types/db.interface";
import {blogCollection} from "../db/mongo-db";
import {ObjectId, UpdateResult} from "mongodb";
import {BlogDBTypeResponse} from "../types/db.response.interface";


export const blogsRepository = {
    
    async getAllBlogs(query: any) {
        const queryName = query.searchNameTerm !== null ? query.searchNameTerm : ''
        const filter = {
            name: {$regex: queryName, $options: "i"},
        }
        const blogs = await blogCollection
            .find(filter)
            .sort(query.sortBy, query.sortDirection)
            .limit(query.pageSize)
            .skip((query.page - 1) * query.pageSize)
            .toArray()
        return {
            ...query,
            items: blogs.map(blog => this.blogMapForRender(blog))
        }
    },

    async create(newBlog: BlogDBType): Promise<any> {
        const blog = {
            ...newBlog,
            isMembership: false,
            createdAt: new Date(Date.now()).toISOString()
        }
        await blogCollection.insertOne(blog)
        return blog
    },

    async findBlogById(blogId: ObjectId) {
        return await blogCollection.findOne({_id: blogId})
    },

    async updateBlogById(blogId: ObjectId, blog: BlogDBType): Promise<UpdateResult> {
        const findedBlog = await blogCollection.findOne({_id: blogId})
        const updates = {
            $set: {
                name: blog.name,
                description: blog.description,
                websiteUrl: blog.websiteUrl,
            }
        }
        const updatedBlog = await blogCollection.updateOne({_id: findedBlog?._id}, updates)
        return updatedBlog
    },

    async findBlogForRender(blogId: ObjectId) {
        const blog = await this.findBlogById(blogId)
        return this.blogMapForRender(blog as BlogDBTypeResponse)
    },

    blogMapForRender(blog: BlogDBTypeResponse) {
        const {_id, createdAt, name, websiteUrl, isMembership, description} = blog
        return {
            id: _id,
            name,
            websiteUrl,
            isMembership,
            createdAt,
            description
        }
    },

    async deleteBlog(blogId: ObjectId) {
        return await blogCollection.deleteOne({_id: blogId})
    }

}
