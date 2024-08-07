import {Request, Response} from 'express';
import {authRepository} from "../repositories/authRepository";
import {usersRepository} from "../repositories/usersRepository";


export const loginController = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body;
        const emailValidate = await usersRepository.validateUserByEmail(email)
        if (!emailValidate) {
            res.status(400).json({errorsMessages: [
                    {
                        message: "Данного email не существует",
                        field: "email"
                    }
            ]})
            return
        }
        const userData = await authRepository.login({email, password});
        if (!userData) {
            res.status(401).json({
                errorsMessages: [
                    {
                        "message": "Неверные данные",
                        "field": "string"
                    }
                ]
            })
        } else {
        res.status(204).send('Вход выполнен')
        }
    } catch (e) {
        res.status(500).send(e)
    }
}
