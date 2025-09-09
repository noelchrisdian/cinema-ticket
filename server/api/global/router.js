import { Router } from "express";
import {
    filterMovie,
    findMovie,
    getSeats,
    indexGenres,
    indexMovies
} from "./controller.js";
import { router as walletRouter } from "../wallets/router.js";
import { router as transactionRouter } from "../transactions/router.js";

const router = Router();

router
    .get('/genres', indexGenres)
    .get('/movies', indexMovies)
    .get('/movies/:id', findMovie)
    .get('/browse-movies/:genreID', filterMovie)
    .get('/check-seats/:movieID', getSeats)
    .use('/', transactionRouter)
    .use('/', walletRouter)

export { router };