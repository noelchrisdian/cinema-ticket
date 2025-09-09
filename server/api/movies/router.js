import { Router } from 'express';
import {
    create,
    find,
    index,
    remove,
    update
} from './controller.js';
import { upload } from '../../utils/multer.js';
const router = Router();

router
    .get('/', index)
    .post(
        '/',
        upload.single('thumbnail'),
        create
    )
    .get('/:id', find)
    .put(
        '/:id',
        upload.single('thumbnail'),
        update
    )
    .delete('/:id', remove)

export { router };