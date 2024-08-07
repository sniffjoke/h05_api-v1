import {ObjectId} from "mongodb";

export interface BlogDBTypeResponse {
    _id: ObjectId;
    name: string;
    description: string;
    websiteUrl: string;
    createdAt?: string;
    isMembership?: boolean
}

export interface PostDBTypeResponse {
    _id: ObjectId;
    title: string;
    shortDescription: string;
    content: string;
    blogId: string;
    blogName: string;
    createdAt?: string;
}
