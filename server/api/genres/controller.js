import { StatusCodes } from "http-status-codes";
import {
    createGenre,
    deleteGenre,
    getGenre,
    getGenres,
    updateGenre
} from "../../services/genres.js";
import { successResponse } from "../../utils/helper.js";

const index = async (req, res, next) => {
    try {
        const genres = await getGenres();
        successResponse(
            res,
            genres,
            'Genres fetched successfully'
        )
    } catch (error) {
        next(error);
    }
}

const find = async (req, res, next) => {
    try {
        const genre = await getGenre(req);
        successResponse(
            res,
            genre,
            `Genre ${genre.name} fetched successfully`
        )
    } catch (error) {
        next(error);
    }
}

const create = async (req, res, next) => {
    try {
        const genre = await createGenre(req);
        successResponse(
            res,
            genre,
            `Genre ${genre.name} has been created`,
            StatusCodes.CREATED
        )
    } catch (error) {
        next(error);
    }
}

const update = async (req, res, next) => {
    try {
        const genre = await updateGenre(req);
        successResponse(
            res,
            genre,
            `Genre ${genre.name} has been updated`
        )
    } catch (error) {
        next(error);
    }
}

const remove = async (req, res, next) => {
    try {
        const genre = await deleteGenre(req);
        successResponse(
            res,
            genre,
            `Genre ${genre.name} has been deleted`
        )
    } catch (error) {
        next(error);
    }
}

export {
    create,
    find,
    index,
    update,
    remove
}