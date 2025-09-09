import multer from 'multer';
import { allowedFiletypes } from './zodSchema.js';
    
const storage = (path = 'public/uploads/thumbnails') => {
    return multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path);
        },
        filename: (req, file, cb) => {
            cb(null, `${Math.floor(Math.random() * 999_999)} - ${file.originalname}`);
        }
    })
}

const fileFilter = (req, file, cb) => {
    if (!allowedFiletypes.includes(file.mimetype)) {
        cb(null, false);
    }

    cb(null, true);
}

const upload = multer({
    storage: storage(),
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter
})

export {
    fileFilter,
    upload,
    storage
}