import { StatusCodes } from "http-status-codes";
import { getAvailableSeats, getFilteredMovies } from "../../services/global.js";
import { getGenres } from "../../services/genres.js";
import { getMovie, getMovies } from "../../services/movies.js";
import { successResponse } from "../../utils/helper.js";
import { getTheaters } from "../../services/theaters.js";

const getSeats = async (req, res, next) => {
    try {
        const seats = await getAvailableSeats(req);
        successResponse(
            res, 
            seats,
            'Seats fetched successfully'
        )
    } catch (error) {
        next(error);
    }
}

const filterMovie = async (req, res, next) => {
    try {
        const { movies, otherMovies } = await getFilteredMovies(req);

        return res.status(StatusCodes.OK).json({
            data: {
                filtered: movies,
                movies: otherMovies
            },
            message: 'Movies fetched successfully',
            status: 'success'
        })
    } catch (error) {
        next(error);
    }
}

const findMovie = async (req, res, next) => {
    try {
        const rows = ['A', 'B', 'C'];
        const seats = rows.flatMap((row) => {
            return Array.from({ length: 5 }, (_, i) => {
                return {
                    seat: `${row}${i + 1}`,
                    isBooked: false
                }
            })
        })
        const movie = await getMovie(req);

        return res.status(StatusCodes.OK).json({
            data: {
                movie: {
                    ...movie.toJSON(),
                    seats,
                    times: ['10:00', '12:00', '15:00', '17:00', '19:00']
                }
            },
            message: `${movie.title} movie fetched successfully`,
            status: 'success'
        })
    } catch (error) {
        next(error);
    }
}

const indexGenres = async (req, res, next) => {
    try {
        const genres = await getGenres();

        successResponse(
            res,
            genres,
            'Genres fetched successfully'
        )
    } catch (error) {
        next(error);
    }
}

const indexMovies = async (req, res, next) => {
    try {
        const movies = await getMovies();
        successResponse(
            res,
            movies,
            'Movies fetched successfully'
        )
    } catch (error) {
        next(error);
    }
}

const indexTheaters = async (req, res, next) => {
    try {
        const theaters = await getTheaters();
        successResponse(
            res,
            theaters,
            'Theaters fetched successfully'
        )
    } catch (error) {
        next(error);
    }
}

export {
    getSeats,
    filterMovie,
    findMovie,
    indexGenres,
    indexMovies,
    indexTheaters
}