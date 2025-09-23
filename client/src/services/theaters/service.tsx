import z from "zod";
import type { BaseResponse } from "@/types/response";
import type { TheaterResponse } from "@/services/theaters/type";
import { privateInstance } from "@/lib/axios";

export const theaterSchema = z.object({
	name: z.string().min(5, "String must contain at least 5 character(s)"),
	city: z.string().nonempty("Please select theater's city location")
})

export type TheaterValues = z.infer<typeof theaterSchema>;

export const getTheaters = async (): Promise<BaseResponse<TheaterResponse[]>> => {
    const response = await privateInstance.get('/admin/theaters')
    return response.data;
}

export const getTheater = async (id: string): Promise<BaseResponse<TheaterResponse>> => {
    const response = await privateInstance.get(`/admin/theaters/${id}`)
    return response.data;
}

export const createTheater = async (data: TheaterValues) => {
    const response = await privateInstance.post('/admin/theaters', data);
    return response.data;
}

export const updateTheater = async (id: string, data: TheaterValues) => {
    const response = await privateInstance.put(`/admin/theaters/${id}`, data);
    return response.data;
}

export const deleteTheater = async (id: string) => {
    const response = await privateInstance.delete(`/admin/theaters/${id}`);
    return response.data;
}