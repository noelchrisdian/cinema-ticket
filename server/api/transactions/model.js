import mongoose, { model, Schema } from 'mongoose';

const transactionSchema = new Schema({
    subtotal: {
        type: Number,
        required: true,
        default: 0
    },
    total: {
        type: Number,
        required: true,
        default: 0
    },
    bookingFee: {
        type: Number,
        required: true,
        default: 0
    },
    tax: {
        type: Number,
        required: true,
        default: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie'
    },
    theater: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Theater'
    },
    date: {
        type: String,
        required: true
    },
    seats: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TransactionSeat'
    }]
}, { timestamps: true })

const transactionModel = model('Transaction', transactionSchema);

const transactionSeatSchema = new Schema({
    transaction: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction'
    },
    seat: {
        type: String,
        required: true
    }
})

const transactionSeatModel = model('TransactionSeat', transactionSeatSchema, 'transactionSeats')

export {
    transactionModel,
    transactionSeatModel
}