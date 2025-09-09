import jwt from 'jsonwebtoken';
import { Unauthorized } from '../errors/notAuthorized.js';
import { userModel as Users } from '../api/users/model.js';

const verifyToken = async (req, res, next) => {
    const header = req.headers.authorization;
    if (!header?.startsWith('Bearer')) {
        throw new Unauthorized('Unauthorized');
    }

    const token = req.headers?.authorization?.split(' ')[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await Users.findOne({ _id: decoded.data.id });
    if (!user) {
        throw new Unauthorized('Invalid token');
    }

    req.user = {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    }
    next();
}

const verifyRole = (role) => {
    return (req, res, next) => {
        if (req?.user?.role === role) {
            return next();
        }

        throw new Unauthorized('Unauthorized');
    }
}

export {
    verifyRole,
    verifyToken
}