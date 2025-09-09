import { movieModel as Movies } from "../api/movies/model.js";
import { theaterModel as Theaters } from "../api/theaters/model.js";
import { transactionModel as Transactions } from "../api/transactions/model.js";

const getAvailableSeats = async (req) => {
    const { movieID } = req.params;
    const { date } = req.query;
    const transactions = await Transactions.findOne({
        date: date?.toString().replace('+', ' '),
        movie: movieID
    }).select('seats').populate({
        path: 'seats',
        select: 'seat'
    })

    const seats = [];
    for (const seat of transactions) {
        seats.push(...seat.seats)
    }

    return seats;
}

const getFilteredMovies = async (req) => {
    const { genreID } = req.params;
    const { city, theaters, availability } = req.query;
    let filterQuery = {};

    if (genreID) {
        filterQuery = {
            ...filterQuery,
            genre: genreID
        }
    }

    if (city) {
        const theaterList = await Theaters.find({ city });
        const theaterID = theaterList.map((theater) => theater._id);
        filterQuery = {
            ...filterQuery,
            theaters: {
                $in: [...theaterID]
            }
        }
    }

    if (theaters) {
        const queryTheaterID = Array.isArray(theaters) ? theaters : theaters.split(',')
        filterQuery = {
            ...filterQuery,
            theaters: {
                $in: [
                    ...(filterQuery?.theaters.$in ?? []),
                    ...queryTheaterID
                ]
            }
        }
    }

    if (availability === 'true') {
        filterQuery = {
            ...filterQuery,
            available: true
        }
    }

    const movies = await Movies.find(filterQuery)
        .select('title genre thumbnail')
        .populate({
            path: 'genre',
            select: 'name'
        })
    
    const otherMovies = await Movies.find()
        .select('title genre theaters thumbnail')
        .populate({
            path: 'genre',
            select: 'name'
        })
        .populate({
            path: 'theaters',
            select: 'city'
        })
    
    return { movies, otherMovies };
}

export {
    getAvailableSeats,
    getFilteredMovies
}