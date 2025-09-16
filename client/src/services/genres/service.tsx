import z from "zod";
import type { BaseResponse } from "@/types/response";
import type { GenreResponse } from "./type";
import { privateInstance } from "@/lib/axios";

export const genreSchema = z.object({
    name: z.string().min(5, 'String must contain at least 5 character(s)')
})

export type GenreValues = z.infer<typeof genreSchema>

export const getGenres = async (): Promise<BaseResponse<GenreResponse[]>> => {
    const response = await privateInstance.get("/admin/genres");
    return response.data;
}

export const getGenre = async (id: string): Promise<BaseResponse<GenreResponse>> => {
    const response = await privateInstance.get(`/admin/genres/${id}`);
    return response.data;
}

export const createGenre = async (data: GenreValues) => {
    const response = await privateInstance.post('/admin/genres', data);
    return response.data;
}

export const updateGenre = async (id: string, data: GenreValues) => {
    const response = await privateInstance.put(`/admin/genres/${id}`, data);
    return response.data;
}

export const deleteGenre = async (id: string) => {
    const response = await privateInstance.delete(`/admin/genres/${id}`);
    return response.data;
}