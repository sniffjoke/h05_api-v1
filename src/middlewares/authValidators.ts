import {param} from "express-validator";
import {ObjectId} from "mongodb";
import {usersRepository} from "../repositories/usersRepository";

export const idUserValidator = param('id')
    .custom(async id => {
        const user: any = await usersRepository.findUserById(new ObjectId(id))
        if (!user) {
            throw new Error('Not found')
        } else {
            return !!user
        }
    }).withMessage('Пост с заданным id не найден!')

