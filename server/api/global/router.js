import { Router } from "express";
import {
    filterMovie,
    findMovie,
    getSeats,
    indexGenres,
    indexMovies,
    indexTheaters
} from "./controller.js";
import { router as walletRouter } from "../wallets/router.js";
import { router as transactionRouter } from "../transactions/router.js";

const router = Router();

router
    .get('/genres', indexGenres)
    .get('/movies', indexMovies)
    .get('/theaters', indexTheaters)
    .get('/movies/:id', findMovie)
    .get('/browse-movies/:genreID', filterMovie)
    .get('/check-seats/:movieID', getSeats)
    .use('/', transactionRouter)
    .use('/', walletRouter)

export { router };