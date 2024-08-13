import {app} from '../src/app'
import {agent} from 'supertest'
import {BlogDBType} from "../src/dtos/blogs.dto";

export const req = agent(app)

export const codeAuth = (code: string) => {
    const buff2 = Buffer.from(code, 'utf8')
    const codedAuth = buff2.toString('base64')
    return codedAuth
}

export const mockBlog: BlogDBType = {
    name: 'n2',
    description: 'd2',
    websiteUrl: 'http://some-url.com'
}
