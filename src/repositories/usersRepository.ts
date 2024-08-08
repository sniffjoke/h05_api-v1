import {UserDBType} from "../types/db.interface";
import {userCollection} from "../db/mongo-db";
import {ObjectId} from "mongodb";
import {UserDBTypeResponse} from "../types/db.response.interface";


export const usersRepository = {

    async getAllUsers(query: any) {
        const queryLogin = query.searchLoginTerm !== null ? query.searchLoginTerm : ''
        const queryEmail = query.searchEmailTerm !== null ? query.searchEmailTerm : ''
        const filter = {
            login: {$regex: queryLogin, $options: "i"},
            email: {$regex: queryEmail, $options: "i"},
        }
        const users = await userCollection
            .find(filter)
            .sort(query.sortBy, query.sortDirection)
            .limit(query.pageSize)
            .skip((query.page - 1) * query.pageSize)
            .toArray()
        return {
            ...query,
            items: users.map(user => this.userMapForRender(user))
        }
    },

    async createUser(newUser: UserDBType): Promise<any> {
        const user = {
            ...newUser,
            createdAt: new Date(Date.now()).toISOString()
        }
        await userCollection.insertOne(user)
        return user
    },

    async findUserById(id: ObjectId) {
        return await userCollection.findOne({_id: id})
    },

    async responseUserForRender(id: ObjectId): Promise<Omit<UserDBTypeResponse, '_id'> | null> {
        const user = await this.findUserById(id)
        return this.userMapForRender(user as UserDBTypeResponse)
    },

    userMapForRender(user: UserDBTypeResponse) {
        const {_id, createdAt, login, email} = user
        return {
            id: _id,
            login,
            email,
            createdAt
        }
    },

    async deleteUser(id: ObjectId) {
        return await userCollection.deleteOne({_id: id})
    },

    async validateUserByEmail(email: string) {
        const user = await this.getUserByEmail(email);
        return user
    },

    async validateUserByLogin(login: string) {
        const user = await this.getUserByLogin(login);
        return user
    },

    // async validateUserByPassword(userDto: LoginUserDto) {
    //  //   const isPasswordCorrect = await bcrypt.compare(userDto.password, '');
        // const user = await this.getUserByEmail(userDto.email);
        // const isPasswordCorrect = userDto.password === user?.password
        // return isPasswordCorrect
    // },

    async getUserByEmail(email: string) {
        const user = await userCollection.findOne({email})
        return user
    },

    async getUserByLogin(login: string) {
        const user = await userCollection.findOne({login})
        return user
    }


}
