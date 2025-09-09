import { BadRequest } from "../errors/badRequest.js";
import { genreModel as Genres } from "../api/genres/model.js";
import { NotFound } from "../errors/notFound.js";

const getGenres = async () => {
    return await Genres.find();
}

const getGenre = async (req) => {
    const { id } = req.params;
    const genre = await Genres.findOne({ _id: id });
    if (!genre) {
        throw new NotFound('Genre not found');
    }

    return genre;
}

const createGenre = async (req) => {
    const { name } = req.body;

    const check = await Genres.findOne({ name });

    if (check) {
        throw new BadRequest('Genre existed');
    }

    return await Genres.create({ name })
}

const updateGenre = async (req) => {
    const { id } = req.params;
    const { name } = req.body;
    const check = await Genres.findOne({
        name,
        _id: { $ne: id }
    })

    if (check) {
        throw new BadRequest('Genre existed');
    }

    const genre = await Genres.findOneAndUpdate(
        { _id: id },
        { name },
        { new: true, runValidators: true }
    )

    if (!genre) {
        throw new NotFound('Genre not found');
    }

    return genre;
}

const deleteGenre = async (req) => {
    const { id } = req.params;
    const genre = await Genres.findOneAndDelete({ _id: id });

    if (!genre) {
        throw new NotFound('Genre not found');
    }

    return genre;
}

export {
    createGenre,
    deleteGenre,
    getGenre,
    getGenres,
    updateGenre
}