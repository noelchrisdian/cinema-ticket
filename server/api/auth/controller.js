import { StatusCodes } from "http-status-codes";
import { signin, signup } from "../../services/auth.js";
import { successResponse } from "../../utils/helper.js";

const login = async (req, res, next) => {
    try {
        const result = await signin(req);
        successResponse(
            res,
            result,
            'Login successful'
        )
    } catch (error) {
        next(error);
    }
}

const register = async (req, res, next) => {
    try {
        const result = await signup(req);
        successResponse(
            res,
            {
                name: result.user.name,
                email: result.user.email
            },
            'Register successful',
            StatusCodes.CREATED
        )
    } catch (error) {
        next(error);
    }
}

export {
    login,
    register
}