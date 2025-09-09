import { Router } from "express";
import {
    create,
    find,
    index,
    remove,
    update
} from "./controller.js";
import { genreSchema } from "../../utils/zodSchema.js";
import { validateRequest } from "../../middlewares/validateRequest.js";

const router = Router();

router
    .get('/', index)
    .post('/', validateRequest(genreSchema), create)
    .get('/:id', find)
    .put('/:id', validateRequest(genreSchema), update)
    .delete('/:id', remove)

export { router };