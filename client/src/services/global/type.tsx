import type { GenreResponse } from "@/services/genres/type";
import type { TheaterResponse } from "@/services/theaters/type";

export interface GlobalMovieResponse {
	_id: string;
	title: string;
    genre: Pick<GenreResponse, '_id' | 'name'>;
    theaters: Pick<TheaterResponse, '_id' | 'city'>[];
	thumbnail: string;
	thumbnailURL: string;
	id: string;
}

export interface FilteredMovieResponse {
	filtered: GlobalMovieResponse[];
	movies: GlobalMovieResponse[];
}

export interface MovieDetailResponse {
	movie: Movie;
}

export interface SeatResponse {
	seat: string;
	isBooked: boolean;
}

export interface CheckSeatResponse {
	_id: string;
	seat: string;
}

export interface Movie {
	_id: string;
	title: string;
	genre: Pick<GenreResponse, '_id' | 'name'>;
	theaters: TheaterResponse[];
	description: string;
	thumbnail: string;
	price: number;
	available: boolean;
	bonus: string;
	createdAt: string;
	updatedAt: string;
	thumbnailURL: string;
	seats: SeatResponse[];
	times: string[];
}