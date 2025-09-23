import 'dotenv/config';
import cors from 'cors';
import express, { json, urlencoded } from 'express';
import { connectDB } from './utils/db.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { router as authRouter } from './api/auth/router.js';
import { router as customerRouter } from './api/users/router.js';
import { router as genreRouter } from './api/genres/router.js';
import { router as globalRouter } from './api/global/router.js';
import { router as movieRouter } from './api/movies/router.js';
import { router as theaterRouter } from './api/theaters/router.js';
import { verifyRole, verifyToken } from './middlewares/verifyToken.js';

const app = express();
const port = process.env.PORT || 3000;

connectDB();

app
    .use(json())
    .use(urlencoded({ extended: true }))
    .use(cors())
    .use(express.static('public'))

app.get('/', (req, res) => {
    res.send('Welcome to Cinema Ticket API');
})

app
    .use('/auth', authRouter)
    .use('/admin', verifyToken, verifyRole('admin'))
    .use('/admin/genres', genreRouter)
    .use('/admin/movies', movieRouter)
    .use('/admin/theaters', theaterRouter)
    .use('/admin/customers', customerRouter)
    .use('/customer', verifyToken, verifyRole('customer'))
    .use('/customer', globalRouter)
    .use(errorHandler)

app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`)
})