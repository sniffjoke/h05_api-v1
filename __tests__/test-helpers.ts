import {app} from '../src/app'
import {agent} from 'supertest'

export const req = agent(app)

export const codeAuth = (code: string) => {
    const buff2 = Buffer.from(code, 'utf8')
    const codedAuth = buff2.toString('base64')
    return codedAuth
}
