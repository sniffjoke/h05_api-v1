import {Request, Response} from 'express';
import {ObjectId} from "mongodb";
import {blogsRepository} from "../repositories/blogsRepository";
import {queryHelper} from "../helpers/helpers";
import {usersRepository} from "../repositories/usersRepository";


export const getUsersController = async (req: Request<any, any, any, any>, res: Response) => {
    const query = await queryHelper(req.query, 'users')
    const users = await usersRepository.getAllUsers(query)
    const {
        pageSize,
        pagesCount,
        totalCount,
        page,
        items
    } = users
    res.status(200).json({
        pageSize,
        pagesCount,
        totalCount,
        page,
        items
    })
}

export const getUserByIdController = async (req: Request, res: Response) => {
    const id = new ObjectId(req.params.id)
    const user = await usersRepository.responseUserForRender(id)
    res.status(200).json(user)
}

export const createUserController = async (req: Request, res: Response) => {
    try {
        const newUser = await usersRepository.createUser(req.body)
        const newUserRender = await usersRepository.userMapForRender(newUser)
        res.status(201).json(newUserRender)
    } catch (e) {
        res.status(500).send(e)
    }
}

export const deleteUserByIdController = async (req: Request, res: Response) => {
    try {
        const id = new ObjectId(req.params.id)
        await usersRepository.deleteUser(id)
        res.status(204).send('Удалено');
    } catch (e) {
        res.status(500).send(e)
    }
}

