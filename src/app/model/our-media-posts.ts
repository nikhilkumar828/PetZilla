export interface Post {
    _id?: string;
    title?: string;
    description: string;
    image: File;
    likedByMe?: boolean;
    followedByMe?: boolean;
    likes?: number;
    followers?: number;
    mobileNo?: string;
}
