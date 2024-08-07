import {Request, Response} from 'express';
import {authRepository} from "../repositories/authRepository";


export const loginController = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body;
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
