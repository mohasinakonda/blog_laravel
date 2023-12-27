import { useState } from "react";
import Modal from "../Modal";
import { useForm } from "@inertiajs/react";
import { User } from "@/types/blog-type";
type Props = {
    onClose: () => void;
    show: boolean;
    blog_id: number;
    user: User;
};

export const AddCommentModal = ({ onClose, show, blog_id, user }: Props) => {
    const { data, post, processing, setData } = useForm({
        rating: 0,
        comment: "",
        user_id: user?.id,
        blog_id: blog_id,
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route("user.blog.comment.store", { user: user, blog: blog_id }));
        onClose();
    };
    return (
        <Modal onClose={onClose} show={show}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-5">
                <h2 className="text-3xl">Add Comment</h2>
                <select
                    onChange={(e) => setData("rating", Number(e.target.value))}
                    name="rating"
                    id=""
                >
                    <option value={0}>Select Rating</option>
                    {[1, 2, 3, 4, 5].map((rating) => (
                        <option value={rating}>{rating}</option>
                    ))}
                </select>
                <textarea
                    className="border rounded"
                    name="commentDesc"
                    onChange={(e) => setData("comment", e.target.value)}
                />
                <div className="flex justify-end gap-5">
                    <button onClick={onClose}>Cancel</button>
                    <button
                        className="px-5 py-2 border border-gray-500 rounded"
                        type={"submit"}
                    >
                        Add Comment
                    </button>
                </div>
            </form>
        </Modal>
    );
};
