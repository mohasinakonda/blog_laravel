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

export type Blog = {
    id: number;
    title: string;
    excerpt: string;
    description: string;
    created_at: string;
    updated_at: string;
    user_id: number;
    user: User;
    comments: Comment[];
};
