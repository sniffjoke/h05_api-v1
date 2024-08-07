import {blogCollection, postCollection} from "../db/mongo-db";


export const testingRepository = {
    async deleteAll() {
        const blogs = await blogCollection.deleteMany()
        const posts = await postCollection.deleteMany()
        return {
            blogs,
            posts
        }
    },
}
