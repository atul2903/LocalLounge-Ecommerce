import mongoose from "mongoose";
import dotenv from 'dotenv';
import colors from "colors";

dotenv.config();
const connectDB = async () => {

    try {

        const connection = await mongoose.connect(process.env.MONGOdb_URL)
        console.log(`connected to db  ${connection.connection.host}`)

    } catch (error) {
        console.log(`error in dbconnect ${error}`.bgRed.white)
    }
}

export default connectDB;