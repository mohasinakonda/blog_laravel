export type User = {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
};
export type Comment = {
    id: number;
    comment: string;
    rating: number;
    user_id: number;
    blog_id: number;
    user: User;
};
export type BookMark = {
    id: number;
    user_id: number;
    blog_id: number;
    status?: boolean | undefined;
};
export type Blog = {
    id: number;
    title: string;
    excerpt: string;
    description: string;
    created_at: string;
    updated_at: string;
    user_id: number;
    comment_avg_rating: number;
    comment_count: number;
    user: User;
    bookmark?: BookMark | undefined;
};
