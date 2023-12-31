import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Blog, User } from "@/types/blog-type";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
type Props = {
    user: User;
    blog?: Blog;
};
const AddBlog = ({ user, blog }: Props) => {
    const [value, setValue] = useState("");
    const [title, setTitle] = useState("");

    useEffect(() => {
        if (blog) {
            setValue(blog?.description!);
            setTitle(blog?.title!);
            localStorage.setItem("description", blog.description);
            localStorage.setItem("title", blog.title);
        }
    }, []);
    return (
        <Authenticated user={user}>
            <div className="max-w-2xl mx-auto mt-5">
                <div>
                    <input
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                            localStorage.setItem("title", e.target.value);
                        }}
                        placeholder="title"
                        className="w-full h-10 mb-5 border border-gray-300 rounded focus:ring-0"
                    />
                </div>
                <ReactQuill
                    placeholder="Write something awesome..."
                    className="bg-white h-[100vh]"
                    modules={{
                        toolbar: [
                            [{ size: [] }],
                            [
                                "bold",
                                "italic",
                                "underline",
                                "strike",
                                "blockquote",
                                "code-block",
                            ],
                            [
                                { list: "ordered" },
                                { list: "bullet" },
                                { indent: "-1" },
                                { indent: "+1" },
                            ],
                            ["link"],
                        ],
                    }}
                    value={value}
                    onChange={(e) => localStorage.setItem("description", e)}
                />
            </div>
        </Authenticated>
    );
};

export default AddBlog;
