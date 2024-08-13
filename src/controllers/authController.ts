import {Request, Response} from 'express';
import {usersQueryRepository} from "../queryRepositories/usersQueryRepository";


export const loginController = async (req: Request, res: Response) => {
    try {
        const {loginOrEmail, password} = req.body;
        let user
        if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(loginOrEmail)) {
            user = await usersQueryRepository.validateUserByLogin(loginOrEmail)
        } else {
            user = await usersQueryRepository.validateUserByEmail(loginOrEmail)
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
        }
        const isPasswordCorrect = password !== user.password // service
        if (!isPasswordCorrect) {
            res.status(204).send('Вход выполнен')
            return
        }
        res.status(401).json({
            errorsMessages: [
                {
                    message: "Неправильный пароль",
                    field: "password"
                }
            ]
        })
        return


    } catch (e) {
        res.status(500).send(e)
    }
}
