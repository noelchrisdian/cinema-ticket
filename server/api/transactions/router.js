import { Router } from "express";
import { transactionSchema } from "../../utils/zodSchema.js";
import { create, find, index } from "./controller.js";
import { validateRequest } from "../../middlewares/validateRequest.js";

const router = Router();

router
    .get('/transactions', index)
    .post('/transactions', validateRequest(transactionSchema), create)
    .get('/transactions/:id', find)

export { router };