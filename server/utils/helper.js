import { StatusCodes } from "http-status-codes";

const getAssetsURL = (path = 'thumbnails') => {
    return `${process.env.APP_URL}/uploads/${path}/`;
}

const successResponse = (res, data, message, status = StatusCodes.OK) => {
    return res.status(status).json({
        data,
        message,
        status: 'success'
    })
}

export {
    getAssetsURL,
    successResponse
}