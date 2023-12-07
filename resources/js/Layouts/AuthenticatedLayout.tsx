import { useState, PropsWithChildren, ReactNode, ChangeEvent } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, router } from "@inertiajs/react";
import { User } from "@/types";
import { Blog } from "@/types/blog-type";

export default function Authenticated({
    user,
    header,
    children,
}: PropsWithChildren<{ user: User; header?: ReactNode }>) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);
    const [timeOutFn, setTimeOutFn] = useState<NodeJS.Timeout>();
    const [searchResult, setSearchResult] = useState<Blog[]>([]);
    const [query, setQuery] = useState<string>("");
    const searchData = (event: ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setQuery(query);
        clearTimeout(timeOutFn);
        if (query.length > 2)
            setTimeOutFn(
                setTimeout(() => {
                    fetch(`/search?query=${query}`)
                        .then((res) => res.json())
                        .then((data) => setSearchResult(data));
                }, 1000)
            );
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="sticky top-0 bg-white border-b border-gray-100">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex">
                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink
                                    href={route("dashboard")}
                                    active={route().current("dashboard")}
                                >
                                    Dashboard
                                </NavLink>
                                <NavLink
                                    href={route("user.blog.index", { user })}
                                    active={route().current("user.blog.index")}
                                >
                                    Blogs
                                </NavLink>
                            </div>
                        </div>
                        <div className="w-[650px] relative">
                            <input
                                onChange={searchData}
                                name="search"
                                className="w-full h-10 border border-gray-300 rounded focus:ring-0"
                                type="text"
                                placeholder="Search"
                            />
                            {searchResult.length > 0 && (
                                <ul className="absolute top-10 border left-0 w-full max-h-[450px] overflow-auto bg-white shadow-lg py-5">
                                    {searchResult.map((blog: Blog) => (
                                        <li
                                            key={blog.id}
                                            className="w-full px-4 border-b rounded cursor-pointer border-b-gray-300 hover:bg-gray-100"
                                            onClick={() => {
                                                setSearchResult([]);
                                                router.visit(
                                                    `/user/${blog.user_id}/blog/${blog.id}`
                                                );
                                            }}
                                        >
                                            <p
                                                className="text-lg font-medium text-gray-400"
                                                dangerouslySetInnerHTML={{
                                                    __html: blog.title.replace(
                                                        new RegExp(
                                                            `(${query})`,
                                                            "gi"
                                                        ),
                                                        '<mark class="font-bold bg-transparent">$&</mark>'
                                                    ),
                                                }}
                                            />
                                            <p
                                                className="text-sm font-medium text-gray-400"
                                                dangerouslySetInnerHTML={{
                                                    __html: blog.excerpt.replace(
                                                        new RegExp(
                                                            `(${query})`,
                                                            "gi"
                                                        ),
                                                        '<mark class="font-bold bg-transparent">$&</mark>'
                                                    ),
                                                }}
                                            />
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <div className="hidden sm:flex sm:items-center sm:ms-6">
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out bg-white border border-transparent rounded-md hover:text-gray-700 focus:outline-none"
                                            >
                                                {user.name}

                                                <svg
                                                    className="ms-2 -me-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route("profile.edit")}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="flex items-center -me-2 sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState
                                    )
                                }
                                className="inline-flex items-center justify-center p-2 text-gray-400 transition duration-150 ease-in-out rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500"
                            >
                                <svg
                                    className="w-6 h-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? "block" : "hidden") +
                        " sm:hidden"
                    }
                >
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink
                            href={route("dashboard")}
                            active={route().current("dashboard")}
                        >
                            Dashboard
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-4 pb-1 border-t border-gray-200">
                        <div className="px-4">
                            <div className="text-base font-medium text-gray-800">
                                {user.name}
                            </div>
                            <div className="text-sm font-medium text-gray-500">
                                {user.email}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route("profile.edit")}>
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route("logout")}
                                as="button"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
