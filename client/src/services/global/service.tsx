import z from "zod";
import type { BaseResponse } from "@/types/response";
import type { GenreResponse } from "@/services/genres/type";
import type {
    CheckSeatResponse,
    FilteredMovieResponse,
    GlobalMovieResponse,
    MovieDetailResponse
} from "@/services/global/type";
import type { FilterState } from "@/redux/features/filter/slice";
import type { TheaterResponse } from "@/services/theaters/type";
import { privateInstance } from "@/lib/axios";

export const filterSchema = z.object({
    availability: z.string().nullable(),
    genre: z.string().nullable(),
    city: z.string().nullable(),
    theaters: z.array(z.string()).nullable()
})

export const transactionSchema = z.object({
    subtotal: z.number(),
    total: z.number(),
    bookingFee: z.number(),
    tax: z.number(),
    movie: z.string(),
    theater: z.string(),
    seats: z.array(z.string()),
    date: z.string()
}).strict();

export type FilterValues = z.infer<typeof filterSchema>;
export type TransactionValues = z.infer<typeof transactionSchema>

export const getGlobalGenres = async (): Promise<BaseResponse<Pick<GenreResponse, '_id' | 'name'>>> => {
    const response = await privateInstance.get('/customer/genres');
    return response.data;
}

export const getGlobalMovies = async (): Promise<BaseResponse<GlobalMovieResponse[]>> => {
    const response = await privateInstance.get('/customer/movies');
    return response.data;
}

export const getGlobalMovie = async (id: string): Promise<BaseResponse<MovieDetailResponse>> => {
    const response = await privateInstance.get(`/customer/movies/${id}`);
    return response.data;
}

export const getGlobalTheaters = async (): Promise<BaseResponse<TheaterResponse>> => {
    const response = await privateInstance.get('/customer/theaters');
    return response.data;
}

export const getFilteredMovie = async (genreID: string, params?: FilterState): Promise<BaseResponse<FilteredMovieResponse>> => {
    const response = await privateInstance.get(`/customer/browse-movies/${genreID}`, {
        params
    })
    return response.data;
}

export const checkSeat = async (id: string, date: string): Promise<BaseResponse<CheckSeatResponse[]>> => {
    const response = await privateInstance.get(`/customer/check-seats/${id}`, {
        params: {
            date
        }
    })

    return response.data;
}

export const buyTicket = async (data: TransactionValues) => {
    const response = await privateInstance.post('/customer/transactions', data);
    return response.data;
}