import type { BaseResponse } from "@/types/response";
import type {
    BalanceHistoryResponse,
    BalanceResponse,
    TopupResponse
} from "@/services/wallets/type";
import { privateInstance } from "@/lib/axios";

export const getBalance = async (): Promise<BaseResponse<BalanceResponse>> => {
    const response = await privateInstance.get('/customer/check-balance');
    return response.data;
}

export const getBalanceHistory = async (): Promise<BaseResponse<BalanceHistoryResponse[]>> => {
    const response = await privateInstance.get('/customer/balance-history');
    return response.data;
}

export const topupWallet = async (data: { balance: number }): Promise<BaseResponse<TopupResponse>> => {
    const response = await privateInstance.post('/customer/top-up', data);
    return response.data;
}