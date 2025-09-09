import mongoose, { model, Schema } from "mongoose";
import { genreModel as Genres } from "../genres/model.js";
import { getAssetsURL } from "../../utils/helper.js";
import { theaterModel as Theaters } from "../theaters/model.js";

const movieSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Movie title is required']
    },
    genre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genre'
    },
    theaters: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Theater'
    }],
    description: {
        type: String
    },
    thumbnail: {
        type: String,
        required: [true, 'Movie thumbnail is required']
    },
    price: Number,
    available: Boolean,
    bonus: String
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true
})

movieSchema.virtual('thumbnailURL').get(function () {
    return `${getAssetsURL()}${this.thumbnail}`;
})

movieSchema.post('save', async (doc) => {
    if (!doc) return;

    if (doc?.genre) {
        await Genres.updateOne(
            { _id: doc.genre },
            { $addToSet: { movies: doc._id } }
        )
    }

    if (doc?.theaters?.length) {
        await Theaters.updateMany(
            { _id: { $in: doc.theaters } },
            { $addToSet: { movies: doc._id } }
        )
    }
})

movieSchema.post('deleteOne', { document: true, query: false }, async (doc) => {
    if (!doc) return;

    if (doc?.genre) {
        await Genres.updateOne(
            { _id: doc.genre },
            { $pull: { movies: doc._id } }
        )
    }

    if (doc?.theaters?.length) {
        await Theaters.updateMany(
            { _id: { $in: doc.theaters } },
            { $pull: { movies: doc._id } }
        )
    }
})

const movieModel = model('Movie', movieSchema);

export { movieModel };