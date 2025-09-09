import { StatusCodes } from "http-status-codes";
import {
    createMovie,
    deleteMovie,
    getMovie,
    getMovies,
    updateMovie
} from "../../services/movies.js";
import { successResponse } from "../../utils/helper.js";

const index = async (req, res, next) => {
    try {
        const movies = await getMovies();
        successResponse(
            res,
            movies,
            'Movies fetched successfully'
        )
    } catch (error) {
        next(error);
    }
}

const create = async (req, res, next) => {
    try {
        const movie = await createMovie(req);
        successResponse(
            res,
            movie,
            `${movie.title} movie has been created`,
            StatusCodes.CREATED
        )
    } catch (error) {
        next(error);
    }
}

const find = async (req, res, next) => {
    try {
        const movie = await getMovie(req);
        successResponse(
            res,
            movie, 
            `${movie.title} movie fetched successfully`
        )
    } catch (error) {
        next(error);
    }
}

const update = async (req, res, next) => {
    try {
        const movie = await updateMovie(req);
        successResponse(
            res,
            movie, 
            `${movie.title} movie has been updated`
        )
    } catch (error) {
        next(error);
    }
}

const remove = async (req, res, next) => {
    try {
        const movie = await deleteMovie(req);
        successResponse(
            res,
            movie, 
            `${movie.title} movie has been deleted`
        )
    } catch (error) {
        next(error);
    }
}

export {
    create,
    find,
    index,
    remove,
    update
}