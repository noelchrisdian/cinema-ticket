import { Router } from "express";
import {
    indexBalance,
    indexBalanceHistory,
    topUp
} from "./controller.js";
import { validateRequest } from "../../middlewares/validateRequest.js";
import { topupSchema } from "../../utils/zodSchema.js";

const router = Router();

router
    .get('/check-balance', indexBalance)
    .get('/balance-history', indexBalanceHistory)
    .post('/top-up', validateRequest(topupSchema), topUp)

export { router };