import { BadRequest } from "../errors/badRequest.js";
import { NotFound } from "../errors/notFound.js";
import { theaterModel as Theaters } from "../api/theaters/model.js";

const getTheaters = async () => {
    return await Theaters.find();
}

const getTheater = async (req) => {
    const { id } = req.params;
    const theater = await Theaters.findOne({ _id: id });
    if (!theater) {
        throw new NotFound('Theater not found');
    }

    return theater;
}

const createTheater = async (req) => {
    const { name, city } = req.body;
    const check = await Theaters.findOne({ name, city });
    if (check) {
        throw new BadRequest('Theater existed');
    }

    return await Theaters.create({ name, city });
}

const updateTheater = async (req) => {
    const { id } = req.params;
    const { name, city } = req.body;
    const check = await Theaters.findOne({
        name,
        city,
        _id: { $ne: id }
    })
    if (check) {
        throw new BadRequest('Theater existed');
    }

    const theater = await Theaters.findOneAndUpdate(
        { _id: id },
        { name, city },
        { new: true, runValidators: true }
    )
    if (!theater) {
        throw new NotFound('Theater not found');
    }

    return theater;
}

const deleteTheater = async (req) => {
    const { id } = req.params;
    const theater = await Theaters.findOneAndDelete({ _id: id });
    if (!theater) {
        throw new NotFound('Theater not found')
    }

    return theater;
}

export {
    createTheater,
    deleteTheater,
    getTheater,
    getTheaters,
    updateTheater
}