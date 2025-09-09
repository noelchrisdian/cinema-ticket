import jwt from 'jsonwebtoken';
import { compare, hash } from 'bcrypt';
import { StatusCodes } from "http-status-codes";
import { authSchema } from '../utils/zodSchema.js';
import { BadRequest } from '../errors/badRequest.js';
import { ParseError } from '../errors/parseError.js';
import { userModel as Users } from "../api/users/model.js";
import { walletModel as Wallets } from '../api/wallets/model.js';

const signin = async (req) => {
    const { email, password, role } = req.body;

    const check = await Users.findOne({ email, role });
    if (!check) {
        throw new BadRequest('Email is not registered');
    }

    const comparePassword = await compare(password, check.password);
    if (!comparePassword) {
        throw new BadRequest('Incorrect password');
    }

    const token = jwt.sign({
        data: {
            id: check._id,
            email: check.email,
            role: check.role
        }
    }, process.env.SECRET_KEY, { expiresIn: '24h' })

    return {
        name: check.name,
        email: check.email,
        role: check.role,
        photoURL: check.photoURL,
        token
    }
}

const signup = async (req) => {
    const parse = authSchema.omit({
        role: true
    }).safeParse(req.body);
    if (!parse.success) {
        const errorMessages = parse.error.issues.map((error) => error.message);
        throw new ParseError('Invalid request', StatusCodes.BAD_REQUEST, errorMessages);
    }

    const check = await Users.findOne({ email: parse.data.email });
    if (check) {
        throw new BadRequest('Email existed');
    }

    const hashPassword = await hash(parse.data.password, 12);
    const user =  await Users.create({
        name: parse.data.name,
        email: parse.data.email,
        password: hashPassword,
        role: 'customer',
        photo: req.file?.filename
    })
    const wallet = await Wallets.create({
        user: user._id,
        balance: 0
    })

    return { user, wallet }
}

export {
    signin,
    signup
}