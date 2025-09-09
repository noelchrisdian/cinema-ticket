import { BadRequest } from "../errors/badRequest.js";
import { walletModel as Wallets } from "../api/wallets/model.js";
import { walletTransactionModel as WalletTransactions } from "../api/wallets/model.js";

const getBalance = async (req) => {
    return await Wallets.findOne({ user: req.user.id });
}

const getBalanceHistory = async (req) => {
    const wallet = await Wallets.findOne({ user: req.user.id });

    return await WalletTransactions
        .find({ wallet: wallet?._id })
        .populate({ path: 'wallet' })
        .select('wallet price createdAt status')
}

const topupBalance = async (req) => {
    const { balance } = req.body;
    const wallet = await Wallets.findOne({ user: req.user.id });
    const topup = await WalletTransactions.create({
        wallet: wallet._id,
        price: balance,
        status: 'pending'
    })

    const response = await fetch(process.env.MIDTRANS_URL, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Basic ${Buffer.from(`${process.env.MIDTRANS_SERVER_KEY}:`).toString('base64')}`
        },
        body: JSON.stringify({
            transaction_details: {
                "order_id": String(topup._id),
                "gross_amount": balance
            },
            credit_card: {
                "secure": true
            },
            customer_details: {
                email: req.user.email
            },
            callbacks: {
                finish: process.env.PAYMENT_REDIRECT_URL
            }
        })
    })
    const data = await response.json();
    if (!response.ok) {
        throw new BadRequest(data.status_message || 'Midtrans error')
    }

    return data;
}

export {
    getBalance,
    getBalanceHistory,
    topupBalance
}