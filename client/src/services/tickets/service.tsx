import type { BaseResponse } from "@/types/response";
import type { TicketResponse } from "./type";
import { privateInstance } from "@/lib/axios";

export const getTickets = async (): Promise<BaseResponse<TicketResponse[]>> => {
    const response = await privateInstance.get('/customer/transactions');
    return response.data;
}

export const getTicket = async (id: string): Promise<BaseResponse<TicketResponse>> => {
    const response = await privateInstance.get(`/customer/transactions/${id}`);
    return response.data;
}