import {UserDBType} from "../types/db.interface";
import {userCollection} from "../db/mongo-db";
import {ObjectId} from "mongodb";
import {UserDBTypeResponse} from "../types/db.response.interface";
import {LoginUserDto} from "../dtos/login.dto";
import * as bcrypt from "bcrypt";


export const usersRepository = {

    async getAllUsers(query: any) {
        const queryName = query.searchNameTerm !== null ? query.searchNameTerm : ''
        const filter = {
            login: {$regex: queryName, $options: "i"},
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
        console.log(user)
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

    async validateUser(userDto: LoginUserDto) {
        const user = await this.getUserByEmail(userDto.email);
        const isPasswordCorrect = await bcrypt.compare(userDto.password, '');
        return user
    },

    async getUserByEmail(email: string) {
        const user = await userCollection.findOne({email})
        return user
    }

}
