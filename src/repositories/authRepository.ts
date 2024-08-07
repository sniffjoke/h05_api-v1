import {LoginUserDto} from "../dtos/login.dto";
import {usersRepository} from "./usersRepository";


export const authRepository = {

    async login(userDto: LoginUserDto): Promise<any> {
        const user = await usersRepository.validateUser(userDto)
        return user
    }

}
