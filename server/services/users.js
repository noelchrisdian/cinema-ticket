import { transactionModel as Transactions } from "../api/transactions/model.js";
import { userModel as Users } from "../api/users/model.js";
import { walletTransactionModel as walletTransactions } from "../api/wallets/model.js";

const getCustomers = async () => {
    return await Users
        .find({ role: 'customer' })
        .select('name email photo')
}

const getWalletTransactions = async () => {
    return await walletTransactions.find().populate({
        path: 'wallet',
        select: 'user',
        populate: {
            path: 'user',
            select: 'name email role'
        }
    })
}

const getTransactions = async (req, res) => {
    return await Transactions.find()
        .populate({ path: 'user', select: 'name' })
        .populate({ path: 'movie', select: 'title' })
        .populate({ path: 'theater', select: 'name city' })
}

export {
    getCustomers,
    getTransactions,
    getWalletTransactions
}