import type { BaseResponse } from "@/types/response";
import type {
    CustomerResponse,
    TransactionResponse,
    WalletTransactionResponse
} from "@/services/customers/type";
import { privateInstance } from "@/lib/axios";

export const getCustomers = async (): Promise<BaseResponse<CustomerResponse[]>> => {
    const response = await privateInstance.get('/admin/customers');
    return response.data;
}

export const getTransactions = async (): Promise<BaseResponse<TransactionResponse[]>> => {
    const response = await privateInstance.get('/admin/customers/ticket-transactions');
    return response.data;
} 

export const getWalletTransactions = async (): Promise<BaseResponse<WalletTransactionResponse[]>> => {
    const response = await privateInstance.get('/admin/customers/wallet-transactions');
    return response.data;
}