import z from "zod";
import type { BaseResponse } from "@/types/response";
import type { MovieResponse } from "@/services/movies/type";
import { privateInstance } from "@/lib/axios";

export const movieSchema = z.object({
    title: z.string().min(5, "String must contain at least 5 character(s)"),
    genre: z.string(),
    theaters: z.array(z.string()),
    available: z.boolean(),
    description: z.string().optional(),
    price: z.string(),
    bonus: z.string().optional(),
    thumbnail: z.any().refine((file: File) => file?.name, {
        message: `Please upload movie's thumbnail`
    })
})

export const baseMovieSchema = movieSchema.extend({
	thumbnail: movieSchema.shape.thumbnail.optional(),
})

export type MovieValues = z.infer<typeof baseMovieSchema>;

export const getMovies = async (): Promise<BaseResponse<MovieResponse[]>> => {
    const response = await privateInstance.get('/admin/movies');
    return response.data;
}

export const getMovie = async (id: string): Promise<BaseResponse<MovieResponse>> => {
    const response = await privateInstance.get(`/admin/movies/${id}`);
    return response.data;
}

export const createMovie = async (data: FormData) => {
    const response = await privateInstance.post('/admin/movies', data, {
        headers: {
            "Content-Type": 'multipart/form-data'
        }
    })
    return response.data;
}

export const updateMovie = async (id: string, data: FormData) => {
    const response = await privateInstance.put(`/admin/movies/${id}`, data, {
        headers: {
            "Content-Type": 'multipart/form-data'
        }
    })
    return response.data;
}

export const deleteMovie = async (id: string) => {
    const response = await privateInstance.delete(`/admin/movies/${id}`);
    return response.data;
}