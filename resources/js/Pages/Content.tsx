import { ChatIcon } from "@/Components/icons/chat";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Blog, Comment, User } from "@/types/blog-type";
import { Link } from "@inertiajs/react";

type BlogWithUser = Blog & {
    user: User;
};

type Props = {
    auth: User;

    blog: BlogWithUser;
    comments: {
        data: Comment[];
        prev_page_url: string;
        next_page_url: string;
        current_page: number;
        last_page: number;
    };
};
const Content = ({ auth, blog, comments }: Props) => {
    const rating = (rating: number) => {
        const roundedRating = Math.round(rating);
        let stars = "";
        for (let i = 0; i <= 5; i++) {
            if (i < roundedRating) {
                stars += "★";
            } else {
                stars += "☆";
            }
        }
        return stars;
    };
    return (
        <Authenticated>
            <div className="min-h-screen mx-auto bg-gray-100">
                <div className="max-w-2xl px-5 pt-20 mx-auto bg-white ">
                    <h2 className="py-5 text-3xl">{blog.title}</h2>
                    <p>
                        Author :{" "}
                        <span className="font-bold">{blog.user.name}</span>
                    </p>
                    <div className="flex gap-5 py-2">
                        <div className="flex gap-1">
                            <ChatIcon />
                            <p>
                                {blog.comment_count}
                                {blog.comment_count === 1
                                    ? "comment"
                                    : "comments"}
                            </p>
                        </div>
                        <p className="text-orange-300">
                            {rating(blog.comment_avg_rating)}
                        </p>
                    </div>

                    <p className="pt-10 ">{blog.description}</p>
                    <h2 className="py-5 text-2xl">Comments</h2>
                    {comments.data.map((comment) => (
                        <div
                            key={comment.id}
                            className="p-5 my-5 bg-gray-200 rounded-md"
                        >
                            <div className="flex justify-between">
                                <p className="font-bold">{comment.user.name}</p>
                                <p className="text-orange-300">
                                    {rating(comment.rating)}
                                </p>
                            </div>
                            <p>{comment.comment}</p>
                        </div>
                    ))}
                    <div className="flex justify-center gap-1 py-5">
                        <Link
                            className={`underline hover:no-underline
                        ${comments.prev_page_url === null ? "" : "font-bold"}`}
                            href={comments.prev_page_url}
                        >
                            Prev
                        </Link>
                        <p>
                            <span className="font-bold">
                                {comments.current_page}/
                            </span>
                            {comments.last_page}
                        </p>
                        <Link
                            className={`underline hover:no-underline
                               ${
                                   comments.next_page_url === null
                                       ? ""
                                       : "font-bold"
                               }`}
                            href={comments.next_page_url}
                        >
                            Next
                        </Link>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
};

export default Content;
