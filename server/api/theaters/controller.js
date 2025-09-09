import { StatusCodes } from "http-status-codes";
import {
    createTheater,
    deleteTheater,
    getTheater,
    getTheaters,
    updateTheater
} from "../../services/theaters.js";
import { successResponse } from "../../utils/helper.js";

const index = async (req, res, next) => {
    try {
        const theaters = await getTheaters();
        successResponse(
            res,
            theaters,
            'Theaters fetched successfully'
        )
    } catch (error) {
        next(error);
    }
}

const find = async (req, res, next) => {
    try {
        const theater = await getTheater(req);
        successResponse(
            res,
            theater,
            `${theater.name} theater fetched successfully`
        )
    } catch (error) {
        next(error);
    }
}

const create = async (req, res, next) => {
    try {
        const theater = await createTheater(req);
        successResponse(
            res,
            theater,
            `${theater.name} theater has been created`,
            StatusCodes.CREATED
        )
    } catch (error) {
        next(error);
    }
}

const update = async (req, res, next) => {
    try {
        const theater = await updateTheater(req);
        successResponse(
            res,
            theater,
            `${theater.name} theater has been updated`
        )
    } catch (error) {
        next(error);
    }
}

const remove = async (req, res, next) => {
    try {
        const theater = await deleteTheater(req);
        successResponse(
            res,
            theater,
            `${theater.name} theater has been deleted`
        )
    } catch (error) {
        next(error)
    }
}

export {
    create,
    find,
    index,
    update,
    remove
}