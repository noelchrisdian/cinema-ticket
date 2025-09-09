import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";

const validateRequest = (schema) => {
    return async (req, res, next) => {
        try {
            schema.parse(req.body);
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const errorMessages = error.issues.map((error) => error.message);

                return res.status(StatusCodes.BAD_REQUEST).json({
                    message: 'Validation failed',
                    status: 'failed',
                    details: errorMessages
                })
            }

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                error: 'Internal server error'
            })
        }
    }
}

export { validateRequest };