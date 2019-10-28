export interface Post {
    _id?: string;
    title?: string;
    description: string;
    image: File;
    likedByMe?: boolean;
    likes?: number;
    mobileNo?: string;
}
