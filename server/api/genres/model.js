import mongoose, { model, Schema } from "mongoose";

const genreSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Genre name is required']
    },
    movies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie'
    }]
}, { timestamps: true })

const genreModel = model('Genre', genreSchema);

export { genreModel };