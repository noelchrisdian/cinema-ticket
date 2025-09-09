import { StatusCodes } from "http-status-codes";
import { CustomError } from "./customError.js";

class Unauthorized extends CustomError {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.UNAUTHORIZED;
    }
}

export { Unauthorized };