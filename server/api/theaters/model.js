import mongoose, { model, Schema } from "mongoose";

const theaterSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Theater name is required']
    }, 
    city: {
        type: String,
        required: [true, 'Theater city is required']
    },
    movies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie'
    }]
}, { timestamps: true })

const theaterModel = model('Theater', theaterSchema);

export { theaterModel };