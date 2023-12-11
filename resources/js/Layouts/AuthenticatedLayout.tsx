import { useState, PropsWithChildren, ReactNode, ChangeEvent } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, router } from "@inertiajs/react";
import { User } from "@/types";
import { Blog } from "@/types/blog-type";
import { ThreeDotFade } from "@/Components/icons/three-dot-fade";

export default function Authenticated({
    user,
    header,
    children,
}: PropsWithChildren<{ user?: User; header?: ReactNode }>) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);
    const [timeOutFn, setTimeOutFn] = useState<NodeJS.Timeout>();
    const [searchResult, setSearchResult] = useState<Blog[]>([]);
    const [query, setQuery] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const searchData = (event: ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setQuery(query);
        clearTimeout(timeOutFn);
        if (query.length > 2) {
            setTimeOutFn(
                setTimeout(() => {
                    setIsLoading(true);
                    fetch(`/search?query=${query}`)
                        .then((res) => res.json())
                        .then((data) => {
                            setSearchResult(data);
                            setIsLoading(false);
                        });
                }, 1000)
            );
        } else {
            setSearchResult([]);
        }
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
                                    href={route("blog.index")}
                                    active={route().current("blog.index")}
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
                            {isLoading && (
                                <div className="absolute top-2 right-3">
                                    <ThreeDotFade />
                                </div>
                            )}

                            {searchResult.length > 0 && (
                                <ul className="absolute top-10 border left-0 w-full max-h-[450px] overflow-auto bg-white shadow-lg py-5">
                                    {searchResult.map((blog: Blog) => (
                                        <li
                                            key={blog.id}
                                            className="w-full px-4 border-b rounded cursor-pointer border-b-gray-300 hover:bg-gray-100"
                                            onClick={() => {
                                                setSearchResult([]);
                                                router.visit(
                                                    `/blog/${blog.id}`
                                                );
                                            }}
                                        >
                                            <p
                                                className="text-lg font-medium text-gray-500"
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
                                                className="text-sm font-medium text-gray-500"
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
                                {user !== null && (
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <span className="inline-flex rounded-md">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out bg-white border border-transparent rounded-md hover:text-gray-700 focus:outline-none"
                                                >
                                                    {user?.name}

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
                                )}
                                {user === null && (
                                    <div className="flex gap-2">
                                        <Link
                                            className="font-bold text-gray-400"
                                            href={route("login")}
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            className="font-bold text-gray-400"
                                            href={route("register")}
                                        >
                                            Register
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <main>{children}</main>
        </div>
    );
}
