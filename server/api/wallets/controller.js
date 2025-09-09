import { StatusCodes } from "http-status-codes";
import {
    getBalance,
    getBalanceHistory,
    topupBalance
} from "../../services/wallets.js";
import { successResponse } from "../../utils/helper.js";

const indexBalance = async (req, res, next) => {
    try {
        const wallets = await getBalance(req);

        return res.status(StatusCodes.OK).json({
            data: {
                balance: wallets?.balance ?? 0
            },
            message: 'Balance fetched successfully',
            status: 'success'
        })
    } catch (error) {
        next(error);
    }
}

const indexBalanceHistory = async (req, res, next) => {
    try {
        const balance = await getBalanceHistory(req);
        successResponse(
            res,
            balance,
            'Balance history fetched successfully'
        )
    } catch (error) {
        next(error);
    }
}

const topUp = async (req, res, next) => {
    try {
        const data = await topupBalance(req);
        successResponse(
            res,
            data,
            'Top up successful'
        )
    } catch (error) {
        next(error);
    }
}

export {
    indexBalance,
    indexBalanceHistory,
    topUp
}