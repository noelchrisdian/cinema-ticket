import { Router } from 'express';
import {
    create,
    find,
    index,
    remove,
    update
} from './controller.js';
import { theaterSchema } from '../../utils/zodSchema.js';
import { validateRequest } from '../../middlewares/validateRequest.js';

const router = Router();

router
    .get('/', index)
    .post('/', validateRequest(theaterSchema), create)
    .get('/:id', find)
    .put('/:id', validateRequest(theaterSchema), update)
    .delete('/:id', remove)

export { router };