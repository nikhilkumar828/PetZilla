export interface Post {
    _id?: string;
    title: string;
    description: string;
    imageSrc: string;
    likedByMe: boolean;
    likes: number;
}
