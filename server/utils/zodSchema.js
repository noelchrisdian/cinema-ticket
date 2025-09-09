import z from "zod";

const allowedFiletypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

const genreSchema = z.object({
    name: z.string().min(5)
}).strict();

const theaterSchema = z.object({
    name: z.string().min(5),
    city: z.string().min(5)
}).strict();

const movieSchema = z.object({
    title: z.string().min(5),
    genre: z.string().min(5),
    theaters: z.array(z.string().min(5)).min(1),
    available: z.boolean(),
    description: z.string().min(5).optional(),
    price: z.number(),
    bonus: z.string().optional()
}).strict();

const authSchema = z.object({
    name: z.string().min(5),
    email: z.string().email(),
    password: z.string().min(5),
    role: z.enum(['admin', 'customer'])
})

const topupSchema = z.object({
    balance: z.number().min(1000)
})

const transactionSchema = z.object({
    subtotal: z.number(),
    total: z.number(),
    bookingFee: z.number(),
    tax: z.number(),
    movie: z.string(),
    theater: z.string(),
    seats: z.array(z.string()),
    date: z.string()
}).strict();

export {
    allowedFiletypes,
    authSchema,
    genreSchema,
    movieSchema,
    theaterSchema,
    topupSchema,
    transactionSchema
}