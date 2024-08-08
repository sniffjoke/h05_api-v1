import {Request, Response} from 'express';
import {usersRepository} from "../repositories/usersRepository";


export const loginController = async (req: Request, res: Response) => {
    try {
        const {loginOrEmail, password} = req.body;
        let user
        if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(loginOrEmail)) {
            user = await usersRepository.validateUserByLogin(loginOrEmail)
        } else {
            user = await usersRepository.validateUserByEmail(loginOrEmail)
        }
        if (!user) {
            res.status(401).json({
                errorsMessages: [
                    {
                        message: "Данного пользователя не существует",
                        field: "loginOrEmail"
                    }
                ]
            })
            return
        } else {
            const isPasswordCorrect = password !== user.password
            if (!isPasswordCorrect) {
                res.status(204).send('Вход выполнен')
            } else {
                res.status(401).json({
                    errorsMessages: [
                        {
                            message: "Неправильный пароль",
                            field: "password"
                        }
                    ]
                })
                return
            }
        }
    } catch (e) {
        res.status(500).send(e)
    }
}
