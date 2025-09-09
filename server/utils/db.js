import mongoose from "mongoose";

const connectDB = async () => {
    const dbConnection = mongoose.connection;
    dbConnection.on('open', (_) => {
        console.log('Database connected');
    })

    dbConnection.on('error', (error) => {
        console.error(`Connection error : ${error}`);
    })

    try {
        await mongoose.connect(process.env.DB_URL);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

export { connectDB };