import { StatusCodes } from 'http-status-codes';
import {
    getCustomers,
    getTransactions,
    getWalletTransactions
} from "../../services/users.js";
import { successResponse } from '../../utils/helper.js';

const indexCustomer = async (req, res, next) => {
    try {
        const customers = await getCustomers();
        successResponse(
            res,
            customers,
            'Customers fetched successfully'
        )
    } catch (error) {
        next(error);
    }
}

const indexWalletTransaction = async (req, res, next) => {
    try {
        const walletTransactions = await getWalletTransactions();
        successResponse(
            res,
            walletTransactions,
            'Wallet transactions fetched successfully'
        )
    } catch (error) {
        next(error);
    }
}

const indexTransaction = async (req, res, next) => {
    try {
        const transactions = await getTransactions();
        successResponse(
            res,
            transactions,
            'Transactions fetched successfully'
        )
    } catch (error) {
        next(error);
    }
}

export {
    indexCustomer,
    indexTransaction,
    indexWalletTransaction
}