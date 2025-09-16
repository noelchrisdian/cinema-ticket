import { AdminGenre } from "@/pages/admin/genres/genres";
import { AdminGenreForm } from "@/pages/admin/genres/form";
import { AdminLayout } from "@/components/admin/layout";
import { AdminLogin } from "@/pages/admin/login";
import { AdminOverview } from "@/pages/admin/overview";
import { getGenre, getGenres } from "@/services/genres/service";
import { getSession } from "@/lib/utils";
import { redirect, type RouteObject } from "react-router-dom";

export const router: RouteObject[] = [
    {
        path: '/admin',
        element: <AdminLayout />,
        loader: () => {
            const user = getSession();
            if (!user || user?.role !== 'admin') {
                throw redirect('/admin/login');
            }

            return user;
        },
        children: [
            {
                index: true,
                element: <AdminOverview />
            },
            {
                path: '/admin/genres',
                loader: async () => {
                    const genres = await getGenres();
                    return genres.data;
                },
                element: <AdminGenre />
            },
            {
                path: '/admin/genres/add',
                element: <AdminGenreForm />
            },
            {
                path: '/admin/genres/edit/:id',
                loader: async ({ params }) => {
                    if (!params.id) {
                        throw redirect('/admin/genres');
                    }

                    const detail = await getGenre(params.id);
                    return detail.data
                },
                element: <AdminGenreForm />
            }
        ]
    },
    {
        path: '/admin/login',
        element: <AdminLogin />
    }
] 