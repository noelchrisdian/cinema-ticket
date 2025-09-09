import { model, Schema } from 'mongoose';
import { getAssetsURL } from '../../utils/helper.js';

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'customer'],
        default: 'customer'
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true
})

userSchema.virtual('photoURL').get(function () {
    return `${getAssetsURL('photos')}${this.photo}`;
})

const userModel = model('User', userSchema);

export { userModel };