import { ChatIcon } from "@/Components/icons/chat";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Blog as BlogProps, User } from "@/types/blog-type";
import { Link } from "@inertiajs/react";
import React from "react";
type Props = {
    auth: {
        user: User;
    };
    blogs: {
        data: BlogProps[];
        prev_page_url: string;
        next_page_url: string;
        current_page: number;
        last_page: number;
    };
};
const Blog = ({ auth, blogs }: Props) => {
    console.log(blogs);
    const rating = (rating: number) => {
        const ratingToNumber = Math.round(rating);
        let rat = "";
        for (let i = 1; i <= 5; i++) {
            if (i <= ratingToNumber) {
                rat += "★";
            } else {
                rat += "☆";
            }
        }
        return rat;
    };
    return (
        <Authenticated user={auth.user}>
            <div className="max-w-2xl mx-auto">
                {blogs.data.length > 0 &&
                    blogs.data.map((blog: any) => (
                        <div key={blog.id}>
                            <div className="p-5 mt-5 bg-white shadow">
                                <h2 className="py-4 text-xl font-medium">
                                    {blog.title}
                                </h2>
                                by -<cite>{blog.user.name}</cite>
                                <p>
                                    Published{" "}
                                    <span className="font-medium">
                                        {new Date(
                                            blog.created_at
                                        ).toDateString()}
                                    </span>
                                </p>
                                <div className="text-orange-300">
                                    {rating(blog.comment_avg_rating)}
                                </div>
                                <p className="py-5 text-gray-500">
                                    {blog.excerpt}
                                    {"... "}
                                    <Link
                                        href={`/blog/${blog.id}`}
                                        className="font-bold"
                                    >
                                        read more
                                    </Link>
                                </p>
                                <div className="flex gap-1">
                                    <ChatIcon />
                                    <Link
                                        href="#"
                                        className="px-2 underline hover:no-underline"
                                    >
                                        {blog.comment_count} comments
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                <div className="flex justify-center gap-1 py-5">
                    <Link
                        className={`underline hover:no-underline
                        ${blogs.prev_page_url === null ? "" : "font-bold"}`}
                        href={blogs.prev_page_url}
                    >
                        Prev
                    </Link>
                    <p>
                        <span className="font-bold">{blogs.current_page}/</span>
                        {blogs.last_page}
                    </p>
                    <Link
                        className={`underline hover:no-underline
                               ${
                                   blogs.next_page_url === null
                                       ? ""
                                       : "font-bold"
                               }`}
                        href={blogs.next_page_url}
                    >
                        Next
                    </Link>
                </div>
                {blogs.data.length == 0 && (
                    <div className="flex items-center justify-center h-screen">
                        <div className="p-10 bg-white rounded shadow">
                            <h2 className="text-3xl text-center">
                                You are caught, No content found
                            </h2>
                            <h2 className="py-4 text-xl font-medium text-center">
                                No content found!
                            </h2>
                            <div className="flex justify-center">
                                <button className="px-4 py-2 border border-gray-400 rounded-full">
                                    add new blog
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Authenticated>
    );
};

export default Blog;
