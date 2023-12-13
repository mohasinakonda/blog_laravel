import { BookmarkFilled } from "@/Components/icons/bookmark-filled";
import { BookmarkIcon } from "@/Components/icons/bookmark-icon";
import { ChatIcon } from "@/Components/icons/chat";
import { CopyToClipboardIcon } from "@/Components/icons/copy-to-clipboard-icon";
import { EditIcon } from "@/Components/icons/edit-icon";
import { ThreeDots } from "@/Components/icons/three-dots";
import { TrashIcon } from "@/Components/icons/trash-icon";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Blog as BlogProps, BookMark, User } from "@/types/blog-type";
import { Link } from "@inertiajs/react";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
type Props = {
    auth: {
        user: User;
    };
    bookmark: number[];
    blogs: {
        data: BlogProps[];
        prev_page_url: string;
        next_page_url: string;
        current_page: number;
        last_page: number;
    };
};
const Blog = ({ auth, blogs, bookmark }: Props) => {
    const [showActionId, setShowActionId] = useState<number | string>("");
    const [bookmarks, setBookmarks] = useState<number[]>(bookmark ?? []);
    const actionRef = useRef<HTMLDivElement | null>(null);
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
    useEffect(() => {
        const hideOutSiteClick = (event: MouseEvent) => {
            if (
                actionRef.current &&
                !actionRef.current.contains(event.target as Node)
            ) {
                setShowActionId("");
            }
        };
        document.addEventListener("mousedown", hideOutSiteClick);
        return () =>
            document.removeEventListener("mousedown", hideOutSiteClick);
    }, []);

    const handleBookMark = async (
        user_id: number,
        blog_id: number,
        status?: boolean
    ) => {
        const data = { user_id, blog_id, status: status ? false : true };
        const response = await axios.post(
            `/user/${user_id}/blog/${blog_id}/bookmark`,
            {
                ...data,
            }
        );

        if (response.status === 200) {
            setBookmarks((prev) => [...prev, blog_id]);
        }
    };

    return (
        <Authenticated user={auth.user}>
            <div className="max-w-2xl mx-auto">
                {blogs.data.length > 0 &&
                    blogs.data.map((blog: BlogProps) => (
                        <div key={blog.id} className="relative group">
                            <div className="p-5 mt-5 bg-white shadow">
                                <h2 className="flex justify-between py-4 text-xl font-medium">
                                    {blog.title}
                                    <button
                                        onClick={() =>
                                            setShowActionId((prev) =>
                                                prev ? "" : blog.id
                                            )
                                        }
                                        className="hidden px-0.5  border rounded-full group-hover:block bg-gray-50 focus:ring-1"
                                    >
                                        <ThreeDots />
                                    </button>
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
                            {showActionId === blog.id && (
                                <div
                                    ref={actionRef}
                                    className="absolute right-0 bg-white border rounded top-16"
                                >
                                    <ul className="w-40 text-gray-500 divide-y">
                                        <button
                                            onClick={() => {
                                                const content_url = `${window.location.origin}/blog/${blog.id}`;
                                                navigator.clipboard.writeText(
                                                    content_url
                                                );
                                                setShowActionId("");
                                            }}
                                            className="flex justify-between py-1.5 px-1 hover:bg-gray-100 w-full"
                                        >
                                            <span>Copy URL</span>{" "}
                                            <CopyToClipboardIcon />
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleBookMark(
                                                    blog.user_id,
                                                    blog.id,
                                                    blog?.bookmark?.status
                                                )
                                            }
                                            className="flex justify-between py-1.5 px-1  hover:bg-gray-100 w-full"
                                        >
                                            {bookmarks.includes(blog.id) ? (
                                                <>
                                                    <span>Bookmarked</span>
                                                    <BookmarkFilled />
                                                </>
                                            ) : (
                                                <>
                                                    <span>Bookmark</span>
                                                    <BookmarkIcon />
                                                </>
                                            )}
                                        </button>
                                        <button className="flex justify-between py-1.5 px-1 hover:bg-gray-100  w-full">
                                            <span>Edit</span> <EditIcon />
                                        </button>
                                        <button className="flex justify-between py-1.5 px-1 text-red-300 hover:bg-gray-100 w-full">
                                            <span>Delete</span> <TrashIcon />
                                        </button>
                                    </ul>
                                </div>
                            )}
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
