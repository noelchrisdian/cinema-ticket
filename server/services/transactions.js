import mongoose from "mongoose";
import { BadRequest } from "../errors/badRequest.js";
import { NotFound } from "../errors/notFound.js";
import { transactionModel as Transactions } from "../api/transactions/model.js";
import { transactionSeatModel as TransactionSeats } from "../api/transactions/model.js";
import { walletModel as Wallets } from "../api/wallets/model.js";

const getTransactions = async (req) => {
    return await Transactions
        .find({ user: req.user?.id })
        .select('seats movie theater date status')
        .populate({
            path: 'movie',
            select: 'thumbnail title genre'
        })
        .populate({
            path: 'seats',
            select: 'seat'
        })
        .populate({
            path: 'theater',
            select: 'city'
        })
}

const getTransaction = async (req) => {
    const { id } = req.params;
    const transaction = await Transactions
        .findOne({ _id: id })
        .select('seats movie theater date status')
        .populate({
            path: 'movie',
            select: 'thumbnail title genre'
        })
        .populate({
            path: 'seats',
            select: 'seat'
        })
        .populate({
            path: 'theater',
            select: 'city'
        })
    if (!transaction) {
        throw new NotFound('Transaction not found');
    }

    return transaction;
}

const createTransaction = async (req) => {
    const {
        bookingFee, 
        date,
        movie,
        seats,
        subtotal,
        tax,
        theater,
        total
    } = req.body;
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const wallet = await Wallets.findOne({ user: req.user.id }).session(session);
        if (!wallet || (wallet && wallet.balance < total)) {
            throw new BadRequest('Insufficient balance, please top up your wallet');
        }

        const [transaction] = await Transactions.create([{
            bookingFee,
            total,
            subtotal,
            theater,
            movie,
            tax,
            user: req.user.id,
            date
        }], { session })

        const transactionSeats = await TransactionSeats.insertMany(
            seats.map((seat) => {
                return {
                    transaction: transaction._id,
                    seat
                }
            }), { session }
        )

        transaction.seats = transactionSeats.map((seat) => seat._id);
        await transaction.save({ session });

        wallet.balance -= total;
        await wallet.save({ session });
        await session.commitTransaction();
        
        return transaction;
    } catch (error) {
        session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
}

export {
    createTransaction,
    getTransaction,
    getTransactions
}