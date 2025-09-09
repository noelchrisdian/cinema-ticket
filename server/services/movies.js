import fs from 'fs';
import path from 'path';
import { StatusCodes } from 'http-status-codes';
import { BadRequest } from '../errors/badRequest.js';
import { genreModel as Genres } from '../api/genres/model.js';
import { movieModel as Movies } from "../api/movies/model.js";
import { movieSchema } from '../utils/zodSchema.js';
import { NotFound } from '../errors/notFound.js';
import { ParseError } from '../errors/parseError.js';
import { theaterModel as Theaters } from '../api/theaters/model.js';

const getMovies = async () => {
    return await Movies.find()
        .populate({ path: 'genre', select: '_id name' })
        .populate({ path: 'theaters', select: '_id name city' })
}

const getMovie = async (req) => {
    const { id } = req.params;
    const movie = await Movies.findOne({ _id: id })
        .populate({ path: 'genre', select: '_id name' })
        .populate({ path: 'theaters', select: '_id name city' })
    if (!movie) {
        throw new NotFound('Movie not found');
    }

    return movie;
}

const createMovie = async (req) => {
    if (!req.file) {
        throw new BadRequest('Thumbnail is required');
    }

    const {
        title,
        genre,
        theaters,
        available,
        description,
        price,
    } = req.body

    const check = await Movies.findOne({ title });
    if (check) {
        throw new BadRequest('Movie existed');
    }

    const parse = movieSchema.safeParse({
        title,
        genre,
        theaters: theaters ? theaters.split(',') : [],
        available: available === '1',
        description,
        price: price ? parseInt(price) : 0,
        bonus: req.body?.bonus
    })
    if (!parse.success) {
        const errorMessages = parse.error.issues.map((error) => error.message);
        throw new ParseError('Invalid request', StatusCodes.BAD_REQUEST, errorMessages);
    }

    return await Movies.create({
        title: parse.data.title,
        genre: parse.data.genre,
        theaters: parse.data.theaters,
        thumbnail: req.file?.filename,
        available: parse.data.available,
        description: parse.data.description,
        price: parse.data.price,
        bonus: parse.data.bonus
    })
}

const updateMovie = async (req) => {
    const { id } = req.params;
    const {
        title,
        genre,
        theaters,
        available,
        description,
        price,
    } = req.body

    const oldMovie = await Movies.findById(id);
    if (!oldMovie) {
        throw new NotFound('Movie not found');
    }

    const check = await Movies.findOne({
        title,
        _id: { $ne: id }
    })
    if (check) {
        throw new BadRequest('Movie existed');
    }

    const parse = movieSchema.safeParse({
        title,
        genre,
        theaters: theaters ? theaters.split(',') : [],
        available: available === '1',
        description,
        price: price ? parseInt(price) : 0,
        bonus: req.body?.bonus
    })
    if (!parse.success) {
        const errorMessages = parse.error.issues.map((error) => error.message);
        throw new ParseError('Invalid request', StatusCodes.BAD_REQUEST, errorMessages);
    }

    let thumbnail = oldMovie.thumbnail;
    if (req.file) {
        const dirname = path.resolve();
        const filepath = path.join(dirname, 'public/uploads/thumbnails', oldMovie.thumbnail ?? '');
        if (fs.existsSync(filepath)) {
            await fs.promises.unlink(filepath);
        }

        thumbnail = req?.file?.filename;
    }

    await Genres.updateMany({ movies: id }, { $pull: { movies: id } });
    await Theaters.updateMany({ movies: id }, { $pull: { movies: id } });

    await Genres.findOneAndUpdate(
        { _id: parse.data.genre },
        { $addToSet: { movies: id } },
        { new: true }
    )
    for (const theater of parse.data.theaters) {
        await Theaters.findOneAndUpdate(
            { _id: theater },
            { $addToSet: { movies: id } },
            { new: true }
        )
    }

    const movie = await Movies.findOneAndUpdate(
        { _id: id }, 
        {
            ...parse.data,
            thumbnail
        },
        { new: true }
    )
    if (!movie) {
        throw new NotFound('Movie not found');
    }

    return movie;
}

const deleteMovie = async (req) => {
    const { id } = req.params;
    const movie = await Movies.findOne({ _id: id });
    if (!movie) {
        throw new NotFound('Movie not found');
    }

    const dirname = path.resolve();
    const filepath = path.join(dirname, 'public/uploads/thumbnails', movie.thumbnail ?? '');
    if (fs.existsSync(filepath)) {
        await fs.promises.unlink(filepath);
    }

    await movie.deleteOne();
    return movie;
}

export {
    createMovie,
    deleteMovie,
    getMovie,
    getMovies,
    updateMovie
}