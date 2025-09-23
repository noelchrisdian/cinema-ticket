import type { MovieResponse } from "@/services/movies/type";
import type { TheaterResponse } from "@/services/theaters/type";

export interface CustomerResponse {
	_id: string;
	name: string;
	email: string;
	photo: string;
	photoURL: string;
}

export interface TransactionResponse {
	_id: string;
	subtotal: number;
	total: number;
	bookingFee: number;
	tax: number;
	user: Pick<CustomerResponse, 'name'>;
	movie: Pick<MovieResponse, 'title'>;
	theater: Pick<TheaterResponse, 'name'>;
	createdAt: string;
	updatedAt: string;
}

export interface WalletResponse {
	_id: string;
	user: Pick<CustomerResponse, 'name'>
}

export interface WalletTransactionResponse {
	_id: string;
	wallet: WalletResponse;
	price: number;
	status: string;
	createdAt: string;
	updatedAt: string;
}