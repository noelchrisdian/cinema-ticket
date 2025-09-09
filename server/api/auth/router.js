import { Router } from 'express';
import { authSchema } from '../../utils/zodSchema.js';
import { fileFilter, storage } from '../../utils/multer.js';
import { login, register } from './controller.js';
import { validateRequest } from '../../middlewares/validateRequest.js';
import multer from 'multer';

const router = Router();

const upload = multer({
    storage: storage('public/uploads/photos'),
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter
})

router
    .post(
        '/register',
        upload.single('photo'),
        register
    )
    .post(
    '/login',
    validateRequest(authSchema.omit({ name: true })),
    login
    )

export { router };