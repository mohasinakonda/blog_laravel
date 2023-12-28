import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { PageProps } from "@/types";
import { Blog, User } from "@/types/blog-type";
type Props = {
    auth: {
        user: User;
    };
    blogs: {
        data: Blog[];
        next_page_url: string;
        prev_page_url: string;
        current_page: number;
        last_page: number;
    };
};
export default function Dashboard({ auth, blogs }: Props) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex items-center justify-center mt-10">
                                <table className="min-w-full overflow-hidden bg-white border border-gray-300 rounded-md shadow-md">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="px-4 py-2 border-b">
                                                ID
                                            </th>
                                            <th className="px-4 py-2 border-b">
                                                Title
                                            </th>
                                            <th className="px-4 py-2 border-b">
                                                Rating
                                            </th>
                                            <th className="px-4 py-2 border-b">
                                                Total Reviews
                                            </th>
                                            <th className="px-4 py-2 border-b">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {blogs.data.map((blog) => (
                                            <tr key={blog.id}>
                                                <td className="px-4 py-2 border-b">
                                                    {blog.id}
                                                </td>
                                                <td className="px-4 py-2 border-b">
                                                    {blog.title}
                                                </td>
                                                <td className="px-4 py-2 border-b">
                                                    {blog.comment_avg_rating}
                                                </td>
                                                <td className="px-4 py-2 text-center border-b">
                                                    {blog.comment_count}
                                                </td>
                                                <td className="px-4 py-2 border-b">
                                                    <Link
                                                        href={route(
                                                            "blog.show",
                                                            { id: blog.id }
                                                        )}
                                                    >
                                                        view
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}

                                        {/* Add more rows as needed */}
                                    </tbody>
                                </table>
                            </div>
                            <div className="flex justify-center gap-1 py-5">
                                <Link
                                    className={`underline hover:no-underline
                        ${blogs.prev_page_url === null ? "" : "font-bold"}`}
                                    href={blogs.prev_page_url}
                                >
                                    Prev
                                </Link>
                                <p>
                                    <span className="font-bold">
                                        {blogs.current_page}/
                                    </span>
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
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
