import {LoginUserDto} from "../dtos/login.dto";


export const authRepository = {

    async login(userDto: LoginUserDto): Promise<any> {
        return userDto
    }

}
