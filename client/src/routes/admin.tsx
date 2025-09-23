import { AdminCustomer } from "@/pages/admin/customers/customer";
import { AdminGenre } from "@/pages/admin/genres/genres";
import { AdminGenreForm } from "@/pages/admin/genres/form";
import { AdminLayout } from "@/components/admin/layout";
import { AdminLogin } from "@/pages/admin/login";
import { AdminMovie } from "@/pages/admin/movies/movies";
import { AdminMovieForm } from "@/pages/admin/movies/form";
import { AdminOverview } from "@/pages/admin/overview";
import { AdminTheater } from "@/pages/admin/theaters/theaters";
import { AdminTheaterForm } from "@/pages/admin/theaters/form";
import { AdminTransaction } from "@/pages/admin/transactions/transactions";
import { AdminWallet } from "@/pages/admin/wallets/wallets";
import {
    getCustomers,
    getTransactions,
    getWalletTransactions
} from "@/services/customers/service";
import { getGenre, getGenres } from "@/services/genres/service";
import { getMovie, getMovies } from "@/services/movies/service";
import { getSession } from "@/lib/utils";
import { getTheater, getTheaters } from "@/services/theaters/service";
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
            },
            {
                path: '/admin/theaters',
                loader: async () => {
                    const theaters = await getTheaters();
                    return theaters.data;
                },
                element: <AdminTheater />
            },
            {
                path: '/admin/theaters/add',
                element: <AdminTheaterForm />
            },
            {
                path: '/admin/theaters/edit/:id',
                loader: async ({ params }) => {
                    if (!params.id) {
                        throw redirect('/admin/theaters')
                    }

                    const detail = await getTheater(params.id);
                    return detail.data;
                },
                element: <AdminTheaterForm />
            },
            {
                path: '/admin/movies',
                loader: async () => {
                    const movies = await getMovies();
                    return movies.data;
                },
                element: <AdminMovie />
            },
            {
                path: '/admin/movies/add',
                loader: async () => {
                    const genres = await getGenres();
                    const theaters = await getTheaters();
                    
                    return {
                        detail: null,
                        genres: genres.data,
                        theaters: theaters.data
                    }
                },
                element: <AdminMovieForm />
            },
            {
                path: '/admin/movies/edit/:id',
                loader: async ({ params }) => {
                    if (!params.id) {
                        throw redirect('/admin/movies');
                    }

                    const genres = await getGenres();
					const theaters = await getTheaters();
                    const detail = await getMovie(params.id);
                    
                    return {
                        detail: detail.data,
                        genres: genres.data,
                        theaters: theaters.data
                    }
                },
                element: <AdminMovieForm />
            },
            {
                path: '/admin/customers',
                loader: async () => {
                    const customers = await getCustomers();
                    return customers.data;
                },
                element: <AdminCustomer />
            },
            {
                path: '/admin/transactions',
                loader: async () => {
                    const transactions = await getTransactions();
                    return transactions.data;
                },
                element: <AdminTransaction />
            },
            {
                path: '/admin/wallet-transactions',
                loader: async () => {
                    const wallet = await getWalletTransactions();
                    return wallet.data;
                },
                element: <AdminWallet />
            }
        ]
    },
    {
        path: '/admin/login',
        loader: () => {
            const user = getSession();
            if (user) {
                throw redirect('/admin');
            }

            return user;
        },
        element: <AdminLogin />
    }
] 