import z from "zod";
import type { BaseResponse } from "@/types/response";
import type { LoginResponse } from "@/services/auth/type";
import { instance } from "@/lib/axios";

export const authSchema = z.object({
	name: z.string().min(5, 'String must contain at least 5 character(s)'),
	email: z.string().email("Invalid email"),
	password: z.string().min(5, "Password must contain at least 5 character(s)"),
	role: z.enum(["admin", "customer"]),
})
export const registerSchema = authSchema.omit({ role: true }).extend({
	photo: z.instanceof(File, { message: 'Photo is required' })
})
export const loginSchema = authSchema.omit({ name: true });
export type LoginValues = z.infer<typeof loginSchema>;
export type RegisterValues = z.infer<typeof registerSchema>;

export const login = async (
	data: LoginValues
): Promise<BaseResponse<LoginResponse>> => {
	const response = await instance.post("/auth/login", data);
	return response.data;
}

export const signup = async (data: FormData) => {
	const response = await instance.post("/auth/register", data);
	return response.data;
}