
export interface BlogDBType {
    name: string;
    description: string;
    websiteUrl: string;
}

export interface PostDBType {
    title: string;
    shortDescription: string;
    content: string;
    blogId: string;
}

export interface UserDBType {
    login: string;
    password: string;
    email: string;
}
