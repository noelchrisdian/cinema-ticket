import type { GenreResponse } from "@/services/genres/type";
import type { TheaterResponse } from "@/services/theaters/type";

export interface MovieResponse {
	_id: string;
	title: string;
	genre: Pick<GenreResponse, '_id' | 'name'>;
    theaters: Pick<TheaterResponse, '_id' | 'name' | 'city'>[];
	description: string;
	thumbnail: string;
	price: number;
	available: boolean;
	bonus: string;
	createdAt: string;
	updatedAt: string;
	thumbnailURL: string;
}