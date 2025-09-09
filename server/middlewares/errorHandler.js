import { StatusCodes } from "http-status-codes";

const errorHandler = (err, req, res, next) => {
    const customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message || 'Something went wrong, try again later',
        details: err.details || undefined
    }

    return res.status(customError.statusCode).json({
        data: null,
        message: customError.message,
        status: 'failed',
        ...(customError.details && { details: customError.details })
    })
}

export { errorHandler };