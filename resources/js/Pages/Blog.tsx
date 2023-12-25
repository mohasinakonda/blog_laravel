import { BookmarkFilled } from "@/Components/icons/bookmark-filled";
import { BookmarkIcon } from "@/Components/icons/bookmark-icon";
import { ChatIcon } from "@/Components/icons/chat";
import { CopyToClipboardIcon } from "@/Components/icons/copy-to-clipboard-icon";
import { EditIcon } from "@/Components/icons/edit-icon";
import { FilterIcon } from "@/Components/icons/filter-icon";
import { ThreeDots } from "@/Components/icons/three-dots";
import { TrashIcon } from "@/Components/icons/trash-icon";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Blog as BlogProps, BookMark, User } from "@/types/blog-type";
import { Link } from "@inertiajs/react";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
type BlogData = {
    data: BlogProps[];
    prev_page_url: string;
    next_page_url: string;
    current_page: number;
    last_page: number;
};
type Props = {
    auth: {
        user: User;
    };
    bookmark: BookMark[];
    blogs: BlogData;
};
const Blog = ({ auth, blogs, bookmark }: Props) => {
    const [blogData, setBlogData] = useState<BlogData>(blogs ?? []);
    const [showActionId, setShowActionId] = useState<number | string>("");
    const [bookmarks, setBookmarks] = useState<BookMark[]>(bookmark ?? []);
    const [showBookmarks, setShowBookmarks] = useState<boolean>(false);
    const [bookmarked, setBookmarked] = useState<boolean[]>([]);
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
        index: number,
        status: boolean
    ) => {
        setBookmarked((prev) =>
            prev.map((item, i) => (i === index ? status : item))
        );
        const data = { user_id, blog_id, status };
        if (status) {
            const response = await axios.post(
                `/user/${user_id}/blog/${blog_id}/bookmark/`,
                {
                    ...data,
                }
            );
        } else {
            const bookmarkedId = bookmarks.find(
                (bookmark) => bookmark.blog_id === blog_id
            )?.id;

            const response = await axios.delete(
                `/user/${user_id}/blog/${blog_id}/bookmark/${bookmarkedId}`
            );
        }
    };
    const showBookmarked = async () => {
        const response = await axios.get(
            route("blog.index") + "?query=bookmarked"
        );
        const data = response.data;
        const blogData = {
            data: data.blogs.data,
            prev_page_url: data.blogs.prev_page_url,
            next_page_url: data.blogs.next_page_url,
            current_page: data.blogs.current_page,
            last_page: data.blogs.last_page,
        };
        setBlogData(blogData);
    };
    useEffect(() => {
        const bookmarkedBlogId = bookmarks.map((bookmark) => bookmark.blog_id);
        const blogId = blogData.data.map((blog) => blog.id);
        const bookmarkedBlog = blogId.map((id) =>
            bookmarkedBlogId.includes(id)
        );

        setBookmarked(bookmarkedBlog);
    }, [blogData]);

    const handleDeletePost = async (blog_id: number) => {
        const response = await axios.delete(`/blog/${blog_id}`);
        if (response.data.status) {
            const newBlogData = blogData.data.filter(
                (blog) => blog.id !== blog_id
            );
            setBlogData((prev) => ({
                ...prev,
                data: newBlogData,
            }));
        }
    };
    return (
        <Authenticated user={auth.user}>
            <div className="relative max-w-2xl mx-auto">
                <button
                    onClick={() => setShowBookmarks(!showBookmarks)}
                    className="flex gap-1 px-4 py-1 mt-5 border border-gray-600 rounded"
                >
                    filter <FilterIcon />
                </button>
                {showBookmarks && (
                    <div className="z-10 w-full p-5 bg-white border rounded top-9">
                        <button onClick={showBookmarked}>
                            show bookmarks blogs
                        </button>
                    </div>
                )}
                {blogData.data.length > 0 &&
                    blogData.data.map((blog: BlogProps, index) => (
                        <div key={blog.id} className="relative group">
                            <div className="p-5 mt-5 bg-white shadow">
                                <div className="flex justify-between">
                                    <h2 className="flex items-center gap-2 text-xl font-medium">
                                        {blog.title}{" "}
                                        <span>
                                            {bookmarked[index] && (
                                                <>
                                                    <BookmarkFilled />
                                                </>
                                            )}
                                        </span>
                                    </h2>
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
                                </div>
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

                                        <input
                                            type="checkbox"
                                            disabled={auth.user == null}
                                            onChange={(event) => {
                                                handleBookMark(
                                                    blog.user_id,
                                                    blog.id,
                                                    index,
                                                    event.target.checked
                                                );
                                            }}
                                            checked={bookmarked[index]}
                                            className="hidden"
                                            name=""
                                            id="bookmark"
                                        />
                                        <label
                                            htmlFor="bookmark"
                                            className={`flex justify-between py-1.5 px-1 hover:bg-gray-100 w-full cursor-pointer ${
                                                auth.user == null
                                                    ? "opacity-50 cursor-not-allowed"
                                                    : ""
                                            }`}
                                        >
                                            {bookmarked[index] ? (
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
                                        </label>
                                        <button className="flex justify-between py-1.5 px-1 hover:bg-gray-100  w-full">
                                            <span>Edit</span> <EditIcon />
                                        </button>
                                        <button
                                            disabled={
                                                auth.user.id !== blog.user_id
                                            }
                                            onClick={() =>
                                                handleDeletePost(blog.id)
                                            }
                                            className={`flex justify-between py-1.5 px-1 text-red-300 hover:bg-gray-100 w-full ${
                                                auth.user.id !== blog.user_id
                                                    ? "opacity-50 cursor-not-allowed"
                                                    : ""
                                            }`}
                                        >
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
                        ${blogData.prev_page_url === null ? "" : "font-bold"}`}
                        href={blogData.prev_page_url}
                    >
                        Prev
                    </Link>
                    <p>
                        <span className="font-bold">
                            {blogData.current_page}/
                        </span>
                        {blogData.last_page}
                    </p>
                    <Link
                        className={`underline hover:no-underline
                               ${
                                   blogData.next_page_url === null
                                       ? ""
                                       : "font-bold"
                               }`}
                        href={blogData.next_page_url}
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

const blogId = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const bookmarkedBlogId = [1, 2, 10];
