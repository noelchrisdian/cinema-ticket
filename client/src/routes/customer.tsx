import { CustomerCheckout } from "@/pages/customer/movies/checkout";
import { CustomerHome } from "@/pages/customer/home";
import { CustomerGenres } from "@/pages/customer/genres/genres";
import { CustomerMovies } from "@/pages/customer/movies/movies";
import { CustomerOrder } from "@/pages/customer/tickets/tickets";
import { CustomerSettings } from "@/pages/customer/settings";
import { CustomerSignin } from "@/pages/customer/signin";
import { CustomerSignup } from "@/pages/customer/signup";
import { CustomerTopup } from "@/pages/customer/wallets/topup";
import { CustomerWallet } from "@/pages/customer/wallets/wallets";
import { getSession } from "@/lib/utils";
import {
    getGlobalGenres,
    getGlobalMovie,
    getGlobalMovies,
    getGlobalTheaters
} from "@/services/global/service";
import { getTicket, getTickets } from "@/services/tickets/service";
import { redirect, type RouteObject } from "react-router-dom";
import { TicketDetail } from "@/pages/customer/tickets/detail";
import { TopupSuccess } from "@/pages/customer/wallets/success";
import { TransactionSuccess } from "@/pages/customer/movies/success";

export const router: RouteObject[] = [
	{
		path: "/sign-up",
		element: <CustomerSignup />
	},
	{
		path: "/sign-in",
		element: <CustomerSignin />
	},
	{
		path: "/browse-genre/:genreID",
		loader: async ({ params }) => {
			const user = getSession();
			if (!user || user.role !== "customer") {
				throw redirect("/sign-in");
			}

			if (!params.genreID) {
				throw redirect("/");
			}

			const genres = await getGlobalGenres();
			const theaters = await getGlobalTheaters();

			return {
				genres: genres.data,
				theaters: theaters.data,
			};
		},
		element: <CustomerGenres />
	},
	{
		path: "/movies/:id",
		loader: async ({ params }) => {
			const user = getSession();
			if (!user || user.role !== "customer") {
				throw redirect("/sign-in");
			}

			if (!params.id) {
				throw redirect("/");
			}

			const movie = await getGlobalMovie(params.id);
			return movie.data;
		},
		element: <CustomerMovies />
	},
	{
		path: "/checkout",
		loader: () => {
			const user = getSession();
			if (!user || user.role !== "customer") {
				throw redirect("/sign-in");
			}

			return user;
		},
		element: <CustomerCheckout />
	},
	{
		path: "/checkout/success",
		loader: () => {
			const user = getSession();
			if (!user || user.role !== "customer") {
				throw redirect("/sign-in");
			}

			return user;
		},
		element: <TransactionSuccess />
	},
	{
		path: "/wallets",
		loader: () => {
			const user = getSession();
			if (!user || user.role !== "customer") {
				throw redirect("/sign-in");
			}

			return user;
		},
		element: <CustomerWallet />
	},
	{
		path: "/top-up",
		loader: () => {
			const user = getSession();
			if (!user || user.role !== "customer") {
				throw redirect("/sign-in");
			}

			return user;
		},
		element: <CustomerTopup />
	},
	{
		path: "/top-up/success",
		loader: () => {
			const user = getSession();
			if (!user || user.role !== "customer") {
				throw redirect("/sign-in");
			}

			return user;
		},
		element: <TopupSuccess />
	},
	{
		path: '/tickets',
		loader: async () => {
			const user = getSession();
			if (!user || user.role !== "customer") {
				throw redirect("/sign-in");
			}

			const tickets = await getTickets();

			return {
				tickets: tickets.data,
				user
			}
		},
		element: <CustomerOrder />
	},
	{
		path: '/tickets/:id',
		loader: async ({ params }) => {
			const user = getSession();
			if (!user || user.role !== "customer") {
				throw redirect("/sign-in");
			}

			if (!params) {
				throw redirect('/tickets');
			}

			const ticket = await getTicket(params.id ?? '');

			return {
				ticket: ticket.data,
				user
			}
		},
		element: <TicketDetail />
	},
	{
		path: '/settings',
		loader: () => {
			const user = getSession();
			if (!user || user.role !== "customer") {
				throw redirect("/sign-in");
			}

			return user;
		},
		element: <CustomerSettings />
	},
	{
		path: "/",
		loader: async () => {
			const user = getSession();
			if (!user || user.role !== "customer") {
				throw redirect("/sign-in");
			}

			const genres = await getGlobalGenres();
			const movies = await getGlobalMovies();

			return {
				genres: genres.data,
				movies: movies.data,
				user,
			}
		},
		element: <CustomerHome />
	}
]