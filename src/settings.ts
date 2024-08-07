import {config} from "dotenv";

config()

export const SETTINGS = {
    PORT: process.env.PORT || 3003,
    PATH: {
        BLOGS: '/api/blogs',
        POSTS: '/api/posts',
        TESTING: '/api/testing/all-data',
        USERS: '/api/users',
        AUTH: '/api/auth/login',
        MONGODB: process.env.MONGO_URI,
        ADMIN: process.env.ADMIN || 'admin:qwerty',
    },
    VARIABLES: {
        DB_NAME: 'bd_5',
        BLOG_COLLECTION_NAME: 'blogs',
        POST_COLLECTION_NAME: 'posts',
        USER_COLLECTION_NAME: 'users'
    }
}
