import {SETTINGS} from "../settings";
import {Collection, Db, MongoClient} from "mongodb";
import {BlogDBType, PostDBType} from "../types/db.interface";

export const client: MongoClient = new MongoClient(SETTINGS.PATH.MONGODB as string) as MongoClient;
export const db: Db = client.db(SETTINGS.VARIABLES.DB_NAME);

// получение доступа к коллекциям
export const blogCollection: Collection<BlogDBType> = db.collection<BlogDBType>(SETTINGS.VARIABLES.BLOG_COLLECTION_NAME)
export const postCollection: Collection<PostDBType> = db.collection<PostDBType>(SETTINGS.VARIABLES.POST_COLLECTION_NAME)

// проверка подключения к бд
export const connectToDB = async () => {

    try {
        await client.connect()
        console.log('connected to db')
        return true
    } catch (e) {
        console.log(e)
        await client.close()
        return false
    }
}
