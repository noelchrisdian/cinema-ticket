import { Router } from "express";
import {
    indexCustomer,
    indexTransaction,
    indexWalletTransaction
} from "./controller.js";

const router = Router();

router
    .get('/', indexCustomer)
    .get('/ticket-transactions', indexTransaction)
    .get('/wallet-transactions', indexWalletTransaction)

export { router };