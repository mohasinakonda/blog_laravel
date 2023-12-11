import { Link, Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { User } from "@/types/blog-type";
type Props = {
    auth: { user: User };
};
export default function Welcome({ auth }: Props) {
    console.log(auth);
    return <Authenticated user={auth.user}></Authenticated>;
}
