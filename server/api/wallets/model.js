import mongoose, { model, Schema } from 'mongoose';

const walletSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    balance: {
        type: Number,
        required: true,
        default: 0
    }
})

const walletModel = model('Wallet', walletSchema);

const walletTransactionSchema = new Schema({
    wallet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Wallet'
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'success', 'failed']
    }
})

const walletTransactionModel = model('WalletTransaction', walletTransactionSchema, 'walletTransactions');

export {
    walletModel,
    walletTransactionModel
}