import type { GenreResponse } from "../genres/type";
import type { SeatResponse } from "../global/type";
import type { MovieResponse } from "../movies/type";
import type { TheaterResponse } from "../theaters/type";

export interface TicketResponse {
	_id: string;
    movie: Pick<MovieResponse, '_id' | 'title' | 'thumbnail' | 'thumbnailURL'> & {
        genre: Pick<GenreResponse, 'name'>;
    }
    subtotal: number;
    total: number;
    bookingFee: number;
    tax: number;
	theater: Pick<TheaterResponse, '_id' | 'name' | 'city'>;
	date: string;
	seats: Pick<SeatResponse, 'seat'>[];
}