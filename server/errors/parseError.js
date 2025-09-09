import { CustomError } from "./customError.js";

class ParseError extends CustomError {
    constructor(message, statusCode, details) {
        super(message);
        this.statusCode = statusCode;
        this.details = details;
    }
}

export { ParseError };