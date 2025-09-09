import { StatusCodes } from "http-status-codes";
import {
    createTransaction,
    getTransaction,
    getTransactions
} from "../../services/transactions.js";
import { successResponse } from "../../utils/helper.js";

const index = async (req, res, next) => {
    try {
        const transactions = await getTransactions(req);
        successResponse(
            res,
            transactions,
            'Transactions fetched successfully'
        )
    } catch (error) {
        next(error);
    }
}

const find = async (req, res, next) => {
    try {
        const transaction = await getTransaction(req);
        successResponse(
            res,
            transaction,
            `Transaction ${transaction._id} fetched successfully`
        )
    } catch (error) {
        next(error);
    }
}

const create = async (req, res, next) => {
    try {
        const transaction = await createTransaction(req);
        successResponse(
            res, 
            transaction,
            'Transaction successful',
            StatusCodes.CREATED
        )
    } catch (error) {
        next(error);
    }
}

export {
    create,
    find,
    index
}